import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Cart } from "./cartEntity";
import { Order } from "./orderEntity";
import { OrderItem } from "./orderItemEntity";
import { CartItem } from "./cartItemEntity";
import { User } from "./userEntity";

@Entity()
export class Product{
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    name!: string;

    @Column({type: 'text'})
    description!: string;

    @Column({type: 'decimal', precision: 10, scale: 2})
    price!: number

    @Column()
    stock!: number;

    @Column({nullable: true})
    imageUrl?: string

    @ManyToOne(() => User, {nullable: false})
    createdBy!: User;
    
    @CreateDateColumn()
    createdAt!: Date;

    @DeleteDateColumn()
    deletedAt?: Date;

    @OneToMany(() => OrderItem, (orderItem) => orderItem.product)
    orderItems!: OrderItem[];

    @OneToMany(() => CartItem, (cartItem) => cartItem.product)
    cartItems!: CartItem[];
}