import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Product } from './entity/product.entity';
import { CreateProductDto, UpdateProductDto } from './dto';
import { CategoriesService } from "../categories/categories.service";
import { Category } from "../categories/entity/category.entity";

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly categoriesService: CategoriesService,
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
  ): Promise<any> {
    const categories = await this.getCategoriesForProduct(product.categories);

    return this.productRepository.save({
      ...product,
      categories,
      image: imagePath,
    });
  }

  async updateProduct(
    idProduct: number,
    product: UpdateProductDto,
  ): Promise<Product> {
    const categories = await this.getCategoriesForProduct(product.categories);

    await this.productRepository.update({ id: idProduct }, {
      ...product,
      categories,
    });

    return this.findProductById(idProduct);
  }

  async getCategoriesForProduct(categories: number[]): Promise<Category[]> {
    return Promise.all(
      categories.map((category) => this.categoriesService.getCategoryById(category)),
    );
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
    const categories = updatedProduct.categories.map((el) => el.id);

    return this.updateProduct(idProduct, {
      ...updatedProduct,
      image: newImagePath,
      categories,
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
