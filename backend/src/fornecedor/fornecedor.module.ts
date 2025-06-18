import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fornecedor } from './fornecedor.entity';
import { FornecedorService } from './fornecedor.service';
import { FornecedorController } from './fornecedor.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Fornecedor])],
  providers: [FornecedorService],
  controllers: [FornecedorController],
})
export class FornecedorModule {}
