import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param, Patch,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors
} from '@nestjs/common';
import {ProductService} from './product.service';
import {FileFieldsInterceptor} from '@nestjs/platform-express';
import {CreateProductDto} from './product.dto';

@Controller('api/product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Patch()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'imageFile', maxCount: 1 },
      { name: 'imagesFiles', maxCount: 6, },
    ]),
  )
  updateProduct() {
    return this.productService.update();
  }

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'imageFile', maxCount: 1 },
      { name: 'imagesFiles', maxCount: 6, },
    ]),
  )
  createProduct(
    @Body() body: CreateProductDto,
    @UploadedFiles()
    files: { imageFile?: Express.Multer.File[]; imagesFiles?: Express.Multer.File[] },
  ) {
    const imageFile = files.imageFile?.[0];

    if (!imageFile) throw new BadRequestException("Image can't be empty");

    return this.productService.create({
      ...body,
      imageFile,
      imagesFiles: files.imagesFiles,
    });
  }

  @Get('/:id')
  findOne(
    @Param('id') id?: string,
  ){
    return this.productService.getOne({ id })
  }

  @Get()
  findAll(
    @Query('categoryId') categoryId?: number,
  ){
    return this.productService.getAll({ categoryId })
  }
}
