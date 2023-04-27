import {Injectable} from '@nestjs/common';
import {Category, FAQ, Product, Subcategory} from '../models';

@Injectable()
export class FaqService {
  constructor() {}

  async getAll() {
    const FAQs = await FAQ.findAll();

    return FAQs;
  }
}
