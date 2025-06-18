import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('produtos')
export class Produto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  categoria: string;

  @Column('decimal', { precision: 10, scale: 2 })
  preco: number;

  @Column()
  estoque: number;

  @Column()
  fornecedorId: number;
}
