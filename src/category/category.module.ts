import {Module} from '@nestjs/common';
import {CategoryController} from './category.controller';
import {CategoryService} from './category.service';

@Module({
  controllers: [CategoryController],
  exports: [CategoryService],
  providers: [CategoryService],
})
export class CategoryModule {}
