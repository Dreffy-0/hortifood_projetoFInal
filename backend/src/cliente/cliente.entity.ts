import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Pedido } from '../pedido/pedido.entity';

@Entity()
export class Cliente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  email: string;

  @Column()
  cpf: string;

  @Column()
  senha: string;

  @Column({ length: 20, default: 'cliente' }) // <-- Adiciona este campo!
  tipo: string; // 'admin', 'entregador' ou 'cliente'

  @OneToMany(() => Pedido, (pedido) => pedido.cliente)
  pedidos: Pedido[];
}
