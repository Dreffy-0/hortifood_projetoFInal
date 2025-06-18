import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Pedido } from './pedido.entity';
import { Produto } from '../produto/produto.entity';

@Entity()
export class PedidoProduto {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Pedido, pedido => pedido.itens, { eager: false })
  pedido: Pedido;

  @ManyToOne(() => Produto, { eager: true })
  produto: Produto;

  @Column()
  quantidade: number;

  @Column('decimal')
  preco: number; // preço unitário no momento do pedido
}
