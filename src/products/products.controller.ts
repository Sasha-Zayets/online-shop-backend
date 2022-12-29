import {
  Controller,
  Param,
  Get,
  Post,
  Put,
  Delete,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/createProduct.dto';
import { UpdateProductDto } from './dto/updateProduct.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsServce: ProductsService) {}

  @Get()
  async getAllProduct() {
    return this.productsServce.findAllProduct();
  }

  @Get(':id')
  async getOneProduct(@Param('id', ParseIntPipe) idProduct: number) {
    return this.productsServce.findProductById(idProduct);
  }

  @Post()
  async createProduct(@Body() product: CreateProductDto) {
    return this.productsServce.createProduct(product);
  }

  @Put(':id')
  async updateProduct(
    @Param('id', ParseIntPipe) idProduct: number,
    @Body() product: UpdateProductDto,
  ) {
    return this.productsServce.updateProduct(idProduct, product);
  }

  @Delete(':id')
  async deleteProduct(@Param('id', ParseIntPipe) idProduct: number) {
    return this.productsServce.deleteProduct(idProduct);
  }
}
