import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Entrega } from './entrega.entity';

@Injectable()
export class EntregaService {
  constructor(
    @InjectRepository(Entrega)
    private entregaRepository: Repository<Entrega>,
  ) {}

  create(entrega: Partial<Entrega>) {
    return this.entregaRepository.save(entrega);
  }

  findAll() {
    return this.entregaRepository.find();
  }
}
