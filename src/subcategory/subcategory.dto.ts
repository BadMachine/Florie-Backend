import {ApiProperty} from '@nestjs/swagger';
import {IsNumber} from 'class-validator';

export class FindAllSubcategoriesDTO {
  @ApiProperty({
    example: 'Category id',
  })
  @IsNumber()
  categoryId?: number;
}
