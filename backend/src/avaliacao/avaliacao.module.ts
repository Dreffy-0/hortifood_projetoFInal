import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Avaliacao } from './avaliacao.entity';
import { AvaliacaoService } from './avaliacao.service';
import { AvaliacaoController } from './avaliacao.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Avaliacao])],
  providers: [AvaliacaoService],
  controllers: [AvaliacaoController],
})
export class AvaliacaoModule {}
