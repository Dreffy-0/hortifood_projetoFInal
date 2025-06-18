import { Controller, Get, Post, Body } from '@nestjs/common';
import { AvaliacaoService } from './avaliacao.service';
import { Avaliacao } from './avaliacao.entity';

@Controller('avaliacoes')
export class AvaliacaoController {
  constructor(private readonly avaliacaoService: AvaliacaoService) {}

  @Post()
  create(@Body() avaliacao: Partial<Avaliacao>) {
    return this.avaliacaoService.create(avaliacao);
  }

  @Get()
  findAll() {
    return this.avaliacaoService.findAll();
  }
}
