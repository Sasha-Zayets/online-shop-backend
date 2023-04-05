import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entity/category.entity';
import { CreateCategoryDto, UpdateCategoryDto } from './dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async getAllCategories(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  async getCategoryById(id: number): Promise<Category> {
    return this.categoryRepository.findOneBy({ id });
  }

  async createCategory(category: CreateCategoryDto): Promise<Category> {
    return this.categoryRepository.save({
      name: category.name,
    });
  }

  async updateCategory(
    id: number,
    category: UpdateCategoryDto,
  ): Promise<Category> {
    await this.categoryRepository.update({ id }, category);

    return await this.categoryRepository.findOneBy({ id });
  }

  async deleteCategory(id: number): Promise<{ status: string }> {
    const category = await this.categoryRepository.findOneBy({ id });
    if (!category) {
      throw new NotFoundException('Category not found');
    }

    await this.categoryRepository.delete({ id });

    return { status: 'deleted' };
  }

  async getCategoriesForProduct(categories: number[]): Promise<Category[]> {
    return Promise.all(
        categories.map((category) => this.getCategoryById(category)),
    );
  }
}
