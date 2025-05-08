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

  @Column()
  paymentMethod!: string;

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
