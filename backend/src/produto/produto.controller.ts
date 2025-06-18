import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { Produto } from './produto.entity';

@Controller('produtos')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @Post()
  create(@Body() produto: Partial<Produto>) {
    return this.produtoService.create(produto);
  }

  @Get()
  findAll() {
    return this.produtoService.findAll();
  }
}
