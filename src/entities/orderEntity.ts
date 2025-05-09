import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./userEntity";
import { OrderItem } from "./orderItemEntity";


export enum PaymentMethod {
  CREDIT_CARD = "Credit Card",
  DEBIT_CARD = "Debit Card",
  BANK_TRANSFER = "Bank Transfer",
  COD = "COD",
  UPI = "UPI"
}

@Entity()
export class Order {

  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => User, (user) => user.orders, {
    onDelete: "CASCADE",
  })
  user!: User;

  @Column()
  status!: "pending" | "paid" | "shipped" | "delivered" | "cancelled";

  @Column({ type: "decimal", precision: 10, scale: 2 })
  totalAmount!: number;

  @Column({
    type: "enum",
    enum: PaymentMethod
  })
  paymentMethod!: PaymentMethod;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, {
    cascade: true,
  })
  orderItems!: OrderItem[];
}
