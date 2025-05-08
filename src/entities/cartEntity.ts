import {
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./userEntity";
import { CartItem } from "./cartItemEntity";

@Entity()
export class Cart {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @OneToOne(() => User, (user) => user.cart, {
    onDelete: "CASCADE",
  })
  user!: User;

  @OneToMany(() => CartItem, (cartItem) => cartItem.cart, {
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  cartItems!: CartItem[];
}
