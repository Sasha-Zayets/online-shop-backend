import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Order } from './entity/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrderDto } from './dto/createOrder.dto';
import { ProductsService } from 'src/products/products.service';
import { DELETE_STATUSES, DeleteEntityStatus } from 'src/common/common.types';
import { UsersService } from "../users/users.service";

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly productsService: ProductsService,
    private readonly usersService: UsersService,
  ) {}

  async getAllOrders(): Promise<Order[]> {
    return this.orderRepository.find();
  }

  async createOrder(order: CreateOrderDto, userId: number): Promise<Order> {
    const products = await this.productsService.findProductsByIds(
      order.products,
    );
    const customer = await this.usersService.findUserById(userId);
    const totalPrice = this.productsService.getTotalPriceForProducts(products);

    return this.orderRepository.save({
      products,
      customer,
      totalPrice,
      comment: order.comment,
      typePayment: order.typePayment,
    });
  }

  async removeOrder(orderId: number): Promise<DeleteEntityStatus> {
    const order = await this.findOrderById(orderId);
    if (!order) {
      throw new NotFoundException('Order not found');
    }

    await this.orderRepository.delete({ id: orderId });

    return { status: DELETE_STATUSES.OK };
  }

  async findOrderById(orderId: number): Promise<Order | null> {
    return this.orderRepository.findOneBy({ id: orderId });
  }
}
