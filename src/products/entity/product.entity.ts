import { Entity, Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from 'src/categories/entity/category.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  // @Column()
  // image: any;

  @Column()
  price: number;

  @Column()
  available: boolean;

  @OneToMany(() => Category, (category) => category.id)
  categories: number[];
}
