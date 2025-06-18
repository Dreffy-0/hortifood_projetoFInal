import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteModule } from './cliente/cliente.module';
import { ProdutoModule } from './produto/produto.module';
import { FornecedorModule } from './fornecedor/fornecedor.module';
import { PedidoModule } from './pedido/pedido.module';
import { AvaliacaoModule } from './avaliacao/avaliacao.module';
import { EntregadorModule } from './entregador/entregador.module';
import { EntregaModule } from './entrega/entrega.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    ClienteModule,
    ProdutoModule,
    FornecedorModule,
    PedidoModule,
    AvaliacaoModule,
    EntregadorModule,
    EntregaModule,
    AuthModule,
  ],
})
export class AppModule {}
