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

export enum OrderStatus{
  PENDING = "Pending",
  PAID = "Paid",
  SHIPPED = "Shipped",
  DELIVERED = "Delivered",
  CANCELLED = "Cancelled"
}

@Entity()
export class Order {

  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => User, (user) => user.orders, {
    onDelete: "CASCADE",
  })
  user!: User;

  @Column({
    type: "enum",
    enum: OrderStatus,
  })
  status!: OrderStatus

  // status!: "pending" | "paid" | "shipped" | "delivered" | "cancelled";

  @Column({ type: "decimal", precision: 10, scale: 2 })
  totalAmount!: number;

  @Column({
    type: "enum",
    enum: PaymentMethod
  })
  paymentMethod!: PaymentMethod;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, {
    cascade: true,
  })
  orderItems!: OrderItem[];
}
