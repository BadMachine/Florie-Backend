import {Controller, Get, Query} from '@nestjs/common';
import {SubcategoryService} from './subcategory.service';

@Controller('api/subcategory')
export class SubcategoryController {
  constructor(private readonly subcategoryService: SubcategoryService) {
  }

  @Get()
  async getAll(
    @Query('categoryId') categoryId?: number,
  ) {
    return this.subcategoryService.getAll({ categoryId });
  }
}
