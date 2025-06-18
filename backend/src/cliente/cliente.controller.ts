import { Controller, Post, Body, Get } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { Cliente } from './cliente.entity';

@Controller('clientes')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Post()
  async criar(@Body() cliente: Partial<Cliente>) {
    return this.clienteService.criar(cliente);
  }

  @Get()
  async findAll() {
    return this.clienteService.findAll();
  }
}
