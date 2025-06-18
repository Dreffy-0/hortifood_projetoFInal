import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('entregadores')
export class Entregador {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;
}
