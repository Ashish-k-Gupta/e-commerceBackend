import { IsEmail } from "class-validator";
import { Column, CreateDateColumn, Entity, HostAddress, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Address } from "./addressEntity";


@Entity()
export class User  {
@PrimaryGeneratedColumn("uuid")
id!: string;

@Column()
@IsEmail()
email!: string

@Column()
password!: string

@CreateDateColumn()
createdAt!: Date;

@UpdateDateColumn()
updatedAt!: Date

@OneToMany(() => Order, (order) => order.user)
order!: Order[];

@OneToMany(() => HostAddress, (address) => address.user,{
    cascade: true,
})
address!: string

@OneToOne(() => Cart, (cart) => cart.user)
cart!: Cart;

}
