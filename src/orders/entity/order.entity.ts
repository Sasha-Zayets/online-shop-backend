import { Product } from 'src/products/entity/product.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { TYPE_PAYMENT } from '../orders.constant';
import { User } from 'src/users/entity/users.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id, {
    eager: true,
  })
  customer: User;

  @OneToMany(() => Product, (product) => product.order, {
    eager: true
  })
  products: Product[];

  @Column()
  totalPrice: number;

  @Column({ default: TYPE_PAYMENT.MONEY })
  typePayment: string;

  @Column()
  comment?: string;
}
