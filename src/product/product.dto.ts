import {IsBoolean, IsUUID, IsNotEmpty, IsNumber, IsOptional, IsString} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({
    example: 'Product name',
  })
  @IsString({ message: 'Name must be a string'})
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Product name',
    example: 'This is description of product #1',
  })
  @IsString({ message: 'Info must be a string'})
  @IsNotEmpty({ message: 'Info mustnt be empty'})
  info: string;

  @ApiProperty({
    example: '56.65',
  })
  @IsNumber()
  price: number;

  @ApiProperty({
    example: '1',
  })
  @IsNumber()
  categoryId: number;

  @ApiProperty({
    example: '2',
  })
  @IsOptional()
  @IsNumber()
  subcategoryId: number | null;

  @ApiProperty({
    example: '5.5',
  })
  @IsNumber()
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
