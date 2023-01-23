import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Product } from './entity/product.entity';
import { CreateProductDto, UpdateProductDto } from './dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async findAllProduct(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async findProductById(idProduct: number): Promise<Product> {
    return this.productRepository.findOneBy({ id: idProduct });
  }

  async findProductsByIds(productsIds: number[]) {
    return this.productRepository.find({
      where: { id: In(productsIds) },
    });
  }

  async createProduct(
    product: CreateProductDto,
    imagePath: string,
  ): Promise<Product> {
    return this.productRepository.save({
      ...product,
      image: imagePath,
    });
  }

  async updateProduct(
    idProduct: number,
    product: UpdateProductDto,
  ): Promise<Product> {
    await this.productRepository.update({ id: idProduct }, product);

    return this.findProductById(idProduct);
  }

  async deleteProduct(idProduct: number): Promise<{ status: string }> {
    await this.productRepository.delete({ id: idProduct });

    return { status: 'deleted' };
  }

  async updateImageForProduct(
    idProduct: number,
    newImagePath: string,
  ): Promise<Product> {
    const updatedProduct = await this.deleteImageForProduct(idProduct);

    return this.updateProduct(idProduct, {
      ...updatedProduct,
      image: newImagePath,
    });
  }

  async deleteImageForProduct(idProduct: number): Promise<Product> {
    const product = await this.productRepository.findOneBy({ id: idProduct });
    const updatedProduct = {
      ...product,
      image: null,
    };
    await this.productRepository.update({ id: idProduct }, updatedProduct);

    return updatedProduct;
  }
}
