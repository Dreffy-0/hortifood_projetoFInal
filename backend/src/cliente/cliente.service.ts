import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Cliente } from './cliente.entity';

@Injectable()
export class ClienteService {
  constructor(
    @InjectRepository(Cliente)
    private clienteRepository: Repository<Cliente>,
  ) {}

  async criar(data: Partial<Cliente>): Promise<Cliente> {
    const salt = 10;
    if (!data.senha) throw new Error('Senha é obrigatória');
    const senhaCriptografada = await bcrypt.hash(data.senha, salt);
    const novoCliente = this.clienteRepository.create({
      ...data,
      senha: senhaCriptografada,
      tipo: data.tipo || 'cliente', // <-- Garante 'cliente' como padrão
    });
    return this.clienteRepository.save(novoCliente);
  }
  
  async buscarPorEmail(email: string): Promise<Cliente | undefined> {
    const resultado = await this.clienteRepository.findOne({ where: { email } });
    return resultado ?? undefined; // converte null para undefined
  }

  async findAll(): Promise<Cliente[]> {
    return this.clienteRepository.find();
  }
}
