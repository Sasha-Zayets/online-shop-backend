import {Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne} from 'typeorm';
import { Category } from 'src/categories/entity/category.entity';
import {Order} from "../../orders/entity/order.entity";

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ default: null })
  image: string | null;

  @Column()
  price: number;

  @Column()
  available: boolean;

  @OneToMany(() => Category, (category) => category.product, {
    eager: true
  })
  categories: Category[];

  @ManyToOne(() => Order, (order) => order.products)
  order: Product;
}
