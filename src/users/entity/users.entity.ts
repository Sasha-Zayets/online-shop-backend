import { Exclude } from 'class-transformer';
import { Order } from 'src/orders/entity/order.entity';
import {Entity, Column, PrimaryGeneratedColumn, OneToOne, OneToMany} from 'typeorm';
import { ROLES } from '../users.constant';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  password: string;

  @Column({ default: ROLES.CUSTOMER })
  role: ROLES;
}
