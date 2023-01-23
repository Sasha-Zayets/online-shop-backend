import { Product } from 'src/products/entity/product.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { TYPE_PAYMENT } from '../orders.constant';
import { User } from 'src/users/entity/users.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, (user) => user.id)
  userId: number;

  @OneToMany(() => Product, (product) => product.id)
  products: number[];

  @Column()
  totalPrice: number;

  @Column({ default: TYPE_PAYMENT.MONEY })
  typePayment: TYPE_PAYMENT;

  @Column()
  comment?: string;
}
