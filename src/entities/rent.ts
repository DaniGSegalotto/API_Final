import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"

@Entity()
export class Rent {
  @PrimaryGeneratedColumn()
  id?: number

  @Column()
  name?: string

  @Column()
  type?: string

  @Column()
  price?: number

  constructor(
    id?: number,
    name?: string,
    type?: string,
    price?: number
  ) {
    this.id = id
    this.name = name
    this.type = type
    this.price = price
  }
}

export default Rent