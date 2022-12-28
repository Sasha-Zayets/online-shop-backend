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

  async getAllCategories() {
    return this.categoryRepository.find();
  }

  async createCategory(category: CreateCategoryDto) {
    return this.categoryRepository.save({
      name: category.name,
    });
  }

  async updateCategory(id: number, category: UpdateCategoryDto) {
    await this.categoryRepository.update({ id }, category);

    return await this.categoryRepository.findOneBy({ id });
  }

  async deleteCategory(id: number) {
    const category = await this.categoryRepository.findOneBy({ id });
    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return this.categoryRepository.delete({ id });
  }
}
