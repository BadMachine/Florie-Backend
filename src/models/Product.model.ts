import {TableName, withoutTimestamps} from '../constants';
import {
  AfterValidate,
  AllowNull,
  AutoIncrement,
  BeforeCreate,
  Column,
  DataType,
  Index,
  Model,
  PrimaryKey,
  Table
} from 'sequelize-typescript';
import { Express } from 'express';

export interface ProductAttributes {
  id: string;
  name: string;
  price: number;
  rating: number;
  categoryId: number;
  subcategoryId: number;
  image?: string;
  imageFile?: Express.Multer.File;
  imagesFiles?: Express.Multer.File[];
  cardImages?: string[];
  info: string;

}

@Table({
  tableName: TableName.PRODUCT,
})
export class Product extends Model<ProductAttributes> {
  @PrimaryKey
  @AllowNull(false)
  @Column(DataType.UUID)
  id: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  name: string;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  price: number;

  @AllowNull(false)
  @Column(DataType.DOUBLE)
  rating: number;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  categoryId: number;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  subcategoryId: number;

  @AllowNull(true)
  @Column(DataType.STRING)
  image?: string;

  @AllowNull(true)
  @Column(DataType.ARRAY(DataType.STRING))
  cardImages?: string[];

  @AllowNull(false)
  @Column(DataType.STRING)
  info: string;

  /** Virtual fields **/
  @Column(DataType.VIRTUAL)
  imageFile: Express.Multer.File;

  @AfterValidate
  static test(instance) {
    console.log('I ', instance);
  }
}
