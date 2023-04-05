import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { Order } from './entity/order.entity';
import { ProductsModule } from '../products/products.module';
import { UsersModule } from "../users/users.module";

@Module({
  imports: [TypeOrmModule.forFeature([Order]), ProductsModule, UsersModule],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
