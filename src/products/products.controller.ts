import * as uuid from 'uuid';
import { Request } from 'express';
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
  UseGuards, Req,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/createProduct.dto';
import { UpdateProductDto } from './dto/updateProduct.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { MAX_SIZE_FOR_IMAGE } from './products.constants';

@Controller('products')
@UseGuards(JwtAuthGuard)
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
    @Req() req: Request,
    @Body(new ValidationPipe({ transform: true })) product: CreateProductDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: MAX_SIZE_FOR_IMAGE }),
          new FileTypeValidator({ fileType: 'image/jpeg' }),
        ],
      }),
    )
    image: Express.Multer.File,
  ) {
    const fullUrl = `${req.protocol}://${req.get('Host')}`;

    const pathImage = image.path.replace('public', '');
    return this.productsServce.createProduct(product, `${fullUrl}${pathImage}`);
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
    @Req() req: Request,
    @Param('idProduct', ParseIntPipe) idProduct: number,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: MAX_SIZE_FOR_IMAGE }),
          new FileTypeValidator({ fileType: 'image/jpeg' }),
        ],
      }),
    )
    image: Express.Multer.File,
  ) {
    const fullUrl = `${req.protocol}://${req.get('Host')}`;
    const pathImage = image.path.replace('public', '');
    return this.productsServce.updateImageForProduct(idProduct, `${fullUrl}${pathImage}`);
  }

  @Delete('images/:idProduct')
  async deleteImageForProduct(
    @Param('idProduct', ParseIntPipe) idProduct: number,
  ) {
    return this.productsServce.deleteImageForProduct(idProduct);
  }
}
