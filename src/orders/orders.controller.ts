import {
  Body,
  Controller,
  Get,
  Post,
  Delete,
  Param,
  UseGuards,
  Req,
  ParseIntPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto';
import { RequestWithUser } from 'src/common/common.types';

@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  async getAllOrders() {
    return this.ordersService.getAllOrders();
  }

  @Post()
  async createOrder(
    @Body() order: CreateOrderDto,
    @Req() req: RequestWithUser,
  ) {
    return this.ordersService.createOrder(order, req.user.id);
  }

  @Delete(':id')
  async removeOrder(@Param('id', ParseIntPipe) orderId: number) {
    return this.ordersService.removeOrder(orderId);
  }
}
