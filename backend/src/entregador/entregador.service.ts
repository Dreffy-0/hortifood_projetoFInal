import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Entregador } from './entregador.entity';

@Injectable()
export class EntregadorService {
  constructor(
    @InjectRepository(Entregador)
    private entregadorRepository: Repository<Entregador>,
  ) {}

  create(entregador: Partial<Entregador>) {
    return this.entregadorRepository.save(entregador);
  }

  findAll() {
    return this.entregadorRepository.find();
  }
}
