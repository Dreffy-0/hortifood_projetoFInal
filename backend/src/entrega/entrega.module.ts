import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Entrega } from './entrega.entity';
import { EntregaService } from './entrega.service';
import { EntregaController } from './entrega.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Entrega])],
  providers: [EntregaService],
  controllers: [EntregaController],
})
export class EntregaModule {}
