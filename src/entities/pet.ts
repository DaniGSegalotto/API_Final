import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"


@Entity()
export class Pet {
  @PrimaryGeneratedColumn()
  id?: number

  @Column()
  nome?: string

  @Column()
  raca?: string

  @Column()
  cor?: string

  @Column()
  idade?: number

  @Column()
  anoNasc?: number


  constructor(
    id?: number,
    nome?: string,
    raca?: string,
    cor?: string,
    idade?: number,
    anoNasc?: number,

  ) {
    this.id = id
    this.nome = nome
    this.raca = raca
    this.cor = cor
    this.idade = idade
    this.anoNasc = anoNasc
  }
}

export default Pet