import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Put,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

@Controller('categories')
@UseGuards(JwtAuthGuard)
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  async getAllCategories() {
    return await this.categoriesService.getAllCategories();
  }

  @Post()
  async createCategory(@Body() category: CreateCategoryDto) {
    return await this.categoriesService.createCategory(category);
  }

  @Put(':id')
  async updateCategory(
    @Param('id', ParseIntPipe) id: number,
    @Body() category: UpdateCategoryDto,
  ) {
    return await this.categoriesService.updateCategory(id, category);
  }

  @Delete(':id')
  async deleteCategory(@Param('id', ParseIntPipe) id: number) {
    return await this.categoriesService.deleteCategory(id);
  }
}
