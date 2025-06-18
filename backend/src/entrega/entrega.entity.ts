import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('entregas')
export class Entrega {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  pedidoId: number;

  @Column()
  nome: string;

  @Column()
  endereco: string;

  @Column()
  statusEntrega: string;
}
