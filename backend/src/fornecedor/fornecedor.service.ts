import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Fornecedor } from './fornecedor.entity';

@Injectable()
export class FornecedorService {
  constructor(
    @InjectRepository(Fornecedor)
    private fornecedorRepository: Repository<Fornecedor>,
  ) {}

  create(fornecedor: Partial<Fornecedor>) {
    return this.fornecedorRepository.save(fornecedor);
  }

  findAll() {
    return this.fornecedorRepository.find();
  }
}
