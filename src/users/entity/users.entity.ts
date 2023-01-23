import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ROLES } from '../users.constant';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: ROLES.CUSTOMER })
  role: ROLES;
}
