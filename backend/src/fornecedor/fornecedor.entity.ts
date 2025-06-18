import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('fornecedores')
export class Fornecedor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;
}
