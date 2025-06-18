import { Controller, Get, Post, Body } from '@nestjs/common';
import { FornecedorService } from './fornecedor.service';
import { Fornecedor } from './fornecedor.entity';

@Controller('fornecedores')
export class FornecedorController {
  constructor(private readonly fornecedorService: FornecedorService) {}

  @Post()
  create(@Body() fornecedor: Partial<Fornecedor>) {
    return this.fornecedorService.create(fornecedor);
  }

  @Get()
  findAll() {
    return this.fornecedorService.findAll();
  }
}
