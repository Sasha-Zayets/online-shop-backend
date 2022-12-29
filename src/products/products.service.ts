import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entity/product.entity';
import { CreateProductDto, UpdateProductDto } from './dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async findAllProduct() {
    return this.productRepository.find();
  }

  async findProductById(idProduct: number): Promise<Product> {
    return this.productRepository.findOneBy({ id: idProduct });
  }

  async createProduct(product: CreateProductDto): Promise<Product> {
    return this.productRepository.save({
      ...product,
    });
  }

  async updateProduct(
    idProduct: number,
    product: UpdateProductDto,
  ): Promise<Product> {
    await this.productRepository.update({ id: idProduct }, product);

    return this.findProductById(idProduct);
  }

  async deleteProduct(idProduct: number) {
    await this.productRepository.delete({ id: idProduct });

    return { status: 'deleted' };
  }
}
