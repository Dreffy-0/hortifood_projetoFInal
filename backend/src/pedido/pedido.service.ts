import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pedido } from './pedido.entity';
import { Cliente } from '../cliente/cliente.entity';
import { Produto } from '../produto/produto.entity';
import { PedidoProduto } from './pedido-produto.entity';

@Injectable()
export class PedidoService {
  constructor(
    @InjectRepository(Pedido)
    private pedidoRepository: Repository<Pedido>,

    @InjectRepository(Cliente)
    private clienteRepository: Repository<Cliente>,

    @InjectRepository(Produto)
    private produtoRepository: Repository<Produto>,

    @InjectRepository(PedidoProduto)
    private pedidoProdutoRepository: Repository<PedidoProduto>,
  ) {}

  async create(clienteId: number, produtos: { produtoId: number; quantidade: number }[]) {
    const cliente = await this.clienteRepository.findOne({ where: { id: clienteId } });
    if (!cliente) throw new NotFoundException('Cliente não encontrado');

    if (!produtos || produtos.length === 0) {
      throw new BadRequestException('Nenhum produto informado');
    }

    const produtosEntidades = await this.produtoRepository.findByIds(produtos.map(p => p.produtoId));
    if (produtosEntidades.length === 0) throw new BadRequestException('Produtos não encontrados');

    const itens: PedidoProduto[] = [];
    let valorTotal = 0;

    for (const item of produtos) {
      const produto = produtosEntidades.find(p => p.id === item.produtoId);
      if (produto && item.quantidade > 0) {
        const pedidoProduto = this.pedidoProdutoRepository.create({
          produto,
          quantidade: item.quantidade,
          preco: produto.preco,
        });
        itens.push(pedidoProduto);
        valorTotal += produto.preco * item.quantidade;
      }
    }

    if (itens.length === 0) {
      throw new BadRequestException('Nenhum produto válido informado');
    }

    const pedido = this.pedidoRepository.create({
      cliente,
      itens,
      formaPagamento: 'Cartão',
      status: 'Em preparação',
      valorTotal,
    });

    return this.pedidoRepository.save(pedido);
  }

  async findAll() {
    return this.pedidoRepository.find({
      relations: ['cliente', 'itens', 'itens.produto'],
      order: { id: 'DESC' },
    });
  }

  async listarPorCliente(clienteId: number) {
    const cliente = await this.clienteRepository.findOne({ where: { id: clienteId } });
    if (!cliente) throw new NotFoundException('Cliente não encontrado');

    const pedidos = await this.pedidoRepository.find({
      where: { cliente: { id: clienteId } },
      relations: ['itens', 'itens.produto', 'cliente'],
      order: { id: 'DESC' },
    });

    return pedidos.map(pedido => ({
      id: pedido.id,
      formaPagamento: pedido.formaPagamento,
      status: pedido.status,
      valorTotal: pedido.valorTotal,
      produtos: pedido.itens.map(item => ({
        id: item.produto.id,
        nome: item.produto.nome,
        preco: Number(item.preco),
        quantidade: item.quantidade,
      })),
    }));
  }

  async atualizarStatus(id: number, status: string) {
    const pedido = await this.pedidoRepository.findOne({ where: { id } });
    if (!pedido) throw new NotFoundException('Pedido não encontrado');
    pedido.status = status;
    return this.pedidoRepository.save(pedido);
  }
}
