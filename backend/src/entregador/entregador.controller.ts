import { Controller, Get, Post, Body } from '@nestjs/common';
import { EntregadorService } from './entregador.service';
import { Entregador } from './entregador.entity';

@Controller('entregadores')
export class EntregadorController {
  constructor(private readonly entregadorService: EntregadorService) {}

  @Post()
  create(@Body() entregador: Partial<Entregador>) {
    return this.entregadorService.create(entregador);
  }

  @Get()
  findAll() {
    return this.entregadorService.findAll();
  }
}
