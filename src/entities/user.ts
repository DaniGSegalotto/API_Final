import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"


@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id?: number

  @Column()
  name?: string

  @Column()
  email?: string

  @Column()
  password?: number

  constructor(
    id?: number,
    name?: string,
    email?: string,
    password?: number,

  ) {
    this.id = id
    this.name = name
    this.email = email
    this.password = password
  }
}

export default User