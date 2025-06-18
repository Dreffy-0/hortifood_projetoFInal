import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('avaliacoes')
export class Avaliacao {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  produtoId: number;

  @Column()
  nota: number;

  @Column()
  comentario: string;
}
