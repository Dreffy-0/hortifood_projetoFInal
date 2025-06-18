import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pedido } from './pedido.entity';
import { PedidoProduto } from './pedido-produto.entity';
import { Produto } from '../produto/produto.entity';
import { Cliente } from '../cliente/cliente.entity';
import { PedidoService } from './pedido.service';
import { PedidoController } from './pedido.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Pedido, PedidoProduto, Produto, Cliente])],
  providers: [PedidoService],
  controllers: [PedidoController],
  exports: [PedidoService],
})
export class PedidoModule {}
