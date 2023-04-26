import {IsBoolean, IsUUID, IsNotEmpty, IsNumber, IsOptional, IsString} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';
import {IsNumeric} from 'sequelize-typescript';

export class CreateProductDto {
  @ApiProperty({
    example: 'Product name',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Product name',
    example: 'This is description of product #1',
  })
  @IsString()
  @IsNotEmpty()
  info: string;

  @ApiProperty({
    example: '56.65',
  })
  price: number;

  @ApiProperty({
    example: '1',
  })
  categoryId: number;

  @ApiProperty({
    example: '2',
  })
  subcategoryId: number;

  @ApiProperty({
    example: '5.5',
  })
  rating: number;

  @ApiProperty({ type: String, format: 'binary' })
  imageFile: Express.Multer.File;

  @ApiProperty({
    type: String,
    format: 'binary',
    isArray: true,
    required: true,
    nullable: false,
    description: 'imagesFiles',
  })
  imagesFiles: Express.Multer.File[];
}

export class FindAllProductsDTO {
  @ApiProperty({
    example: 'Category id',
  })
  @IsNumber()
  categoryId?: number;
}

export class FindOneProductDTO {
  @ApiProperty({
    example: 'Product id',
  })
  @IsUUID(4)
  id: string;
}
