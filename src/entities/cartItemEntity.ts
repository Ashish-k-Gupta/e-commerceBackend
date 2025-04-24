import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Cart } from "./cartEntity";
import { Product } from "./productEntity";

@Entity()
@Unique(["cart", "product"])
export class CartItem {
    @PrimaryGeneratedColumn('uuid')
    id!: string

    @Column()
    quantity!: number;

    @ManyToOne(() => Cart, (cart) => cart.cartItems)
    cart!: Cart;


    @ManyToOne(() => Product, (product) => product.cartItems)
    product!: Product;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    price!: number;
}