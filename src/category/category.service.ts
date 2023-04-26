import {Injectable} from '@nestjs/common';
import {ServiceWithSpaces} from '../prototype/withSpaces.service';
import {SpacesService} from '../spaces/spaces.service';
import {Category, Product, Subcategory} from '../models';

@Injectable()
export class CategoryService {
  constructor() {}

  async getAll() {
    const categories = await Category.findAll({
      include: [
        {
          model: Subcategory,
        }
      ],
    });

    return { categories };
  }
}
