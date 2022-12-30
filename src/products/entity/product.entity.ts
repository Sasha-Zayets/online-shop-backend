import { Entity, Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from 'src/categories/entity/category.entity';

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

  @OneToMany(() => Category, (category) => category.id)
  categories: number[];
}
