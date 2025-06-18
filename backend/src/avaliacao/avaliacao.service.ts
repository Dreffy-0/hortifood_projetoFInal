import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Avaliacao } from './avaliacao.entity';

@Injectable()
export class AvaliacaoService {
  constructor(
    @InjectRepository(Avaliacao)
    private avaliacaoRepository: Repository<Avaliacao>,
  ) {}

  create(avaliacao: Partial<Avaliacao>) {
    return this.avaliacaoRepository.save(avaliacao);
  }

  findAll() {
    return this.avaliacaoRepository.find();
  }
}
