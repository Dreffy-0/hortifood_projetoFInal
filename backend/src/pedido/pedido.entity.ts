import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, Column } from 'typeorm';
import { Cliente } from '../cliente/cliente.entity';
import { PedidoProduto } from './pedido-produto.entity';

@Entity()
export class Pedido {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Cliente, { eager: true })
  cliente: Cliente;

  @OneToMany(() => PedidoProduto, item => item.pedido, { cascade: true, eager: true })
  itens: PedidoProduto[];

  @Column({ default: 'Cartão' })
  formaPagamento: string;

  @Column({ default: 'Em preparação' })
  status: string;

  @Column('decimal')
  valorTotal: number;
}
