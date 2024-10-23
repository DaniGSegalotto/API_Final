import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"


@Entity()
export class Tarefa {
  @PrimaryGeneratedColumn()
  id?: number

  @Column()
  titulo?: string

  @Column()
  descricao?: string

  @Column()
  dataInicio?: number

  @Column()
  dataFim?: number

  @Column()
  prioridade?: string


  constructor(
    id?: number,
    titulo?: string,
    descricao?: string,
    dataInicio?: number,
    dataFim?: number,
    prioridade?: string,

  ) {
    this.id = id
    this.titulo = titulo
    this.descricao = descricao
    this.dataInicio = dataInicio
    this.dataFim = dataFim
    this.prioridade = prioridade
  }
}

export default Tarefa