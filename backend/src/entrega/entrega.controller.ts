import { Controller, Get, Post, Body } from '@nestjs/common';
import { EntregaService } from './entrega.service';
import { Entrega } from './entrega.entity';

@Controller('entregas')
export class EntregaController {
  constructor(private readonly entregaService: EntregaService) {}

  @Post()
  create(@Body() entrega: Partial<Entrega>) {
    return this.entregaService.create(entrega);
  }

  @Get()
  findAll() {
    return this.entregaService.findAll();
  }
}
