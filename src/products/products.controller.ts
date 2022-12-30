import * as uuid from 'uuid';
import { diskStorage } from 'multer';
import { extname } from 'path';
import {
  Controller,
  Param,
  Get,
  Post,
  Put,
  Delete,
  Body,
  UploadedFile,
  ParseIntPipe,
  UseInterceptors,
  ValidationPipe,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
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
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './public/content/products',
        filename: (_, file, cb) => {
          const fileName = uuid.v4();
          cb(null, `${fileName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async createProduct(
    @Body(new ValidationPipe({ transform: true })) product: CreateProductDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1000 }),
          new FileTypeValidator({ fileType: 'image/jpeg' }),
        ],
      }),
    )
    image: Express.Multer.File,
  ) {
    const pathImage = image.path.replace('public', '');
    return this.productsServce.createProduct(product, pathImage);
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

  @Put('images/:idProduct')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './public/content/products',
        filename: (_, file, cb) => {
          const fileName = uuid.v4();
          cb(null, `${fileName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async updateImageForProduct(
    @Param('idProduct', ParseIntPipe) idProduct: number,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1000 }),
          new FileTypeValidator({ fileType: 'image/jpeg' }),
        ],
      }),
    )
    image: Express.Multer.File,
  ) {
    const pathImage = image.path.replace('public', '');
    return this.productsServce.updateImageForProduct(idProduct, pathImage);
  }

  @Delete('images/:idProduct')
  async deleteImageForProduct(
    @Param('idProduct', ParseIntPipe) idProduct: number,
  ) {
    return this.productsServce.deleteImageForProduct(idProduct);
  }
}
