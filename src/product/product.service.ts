import {ServiceWithSpaces} from '../prototype/withSpaces.service';
import {Injectable} from '@nestjs/common';
import {SpacesService} from '../spaces/spaces.service';
import {Product} from '../models';
import {CreateProductDto, FindAllProductsDTO, FindOneProductDTO} from './product.dto';

@Injectable()
export class ProductService extends ServiceWithSpaces {
  constructor(private readonly spacesService: SpacesService) {
    super(spacesService, Product);
  }

  async create(data: CreateProductDto) {
    const product = await Product.create({ ...data });

    return product;
  }

  async update() {
    return {}
  }

  async getAll({ categoryId }: FindAllProductsDTO) {

    const where = categoryId && +categoryId !==0 ? { categoryId } : {};
    const products = await Product.findAll({ where });

    return { products };
  }

  async getOne({ id }: FindOneProductDTO) {
    const where = { id };
    const product = await Product.findOne({ where });

    return product;
  }
}
