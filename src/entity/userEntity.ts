import { isEmail } from "class-validator";
import { Column, CreateDateColumn, Entity, JoinColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity()
export  class User  {
@PrimaryGeneratedColumn("uuid")
id!: string;

@Column()
email!: string

@Column()
password!: string

@CreateDateColumn()
createdAt: Date;

@UpdateDateColumn()
updatedAt: Date


@JoinColumn()
@Column()



}