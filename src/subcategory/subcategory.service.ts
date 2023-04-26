import {Injectable} from '@nestjs/common';
import {Category, Product, Subcategory} from '../models';
import {FindAllSubcategoriesDTO} from './subcategory.dto';

@Injectable()
export class SubcategoryService {
  constructor() {}

  async getAll({ categoryId }: FindAllSubcategoriesDTO) {

    const where = categoryId && +categoryId !==0 ? { categoryId } : {};
    const subcategories = await Subcategory.findAll({ where });

    return { subcategories };
  }
}
