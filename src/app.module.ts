import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ProductModule} from './product/product.module';
import {DatabaseModule} from './database/database.module';
import dotEnv = require('dotenv');
import {CategoryModule} from './category/category.module';
import {SubcategoryModule} from './subcategory/subcategory.module';
import {FaqModule} from './faq/faq.module';
dotEnv.config();
@Module({
  imports: [
    DatabaseModule,
    ProductModule,
    CategoryModule,
    SubcategoryModule,
    FaqModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
