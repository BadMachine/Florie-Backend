import {TableName, withoutTimestamps} from '../constants';
import {
  AllowNull,
  Column,
  DataType, ForeignKey, HasMany, HasOne,
  Model,
  PrimaryKey,
  Table
} from 'sequelize-typescript';
import { Express } from 'express';
import {Grid} from './Grid.model';
import {Category} from './Category.model';

export interface SubcategoryAttributes {
  id: number;
  typeId: number;
  name: string;
  gridType: number;
}

@Table({
  tableName: TableName.Subcategory,
})
export class Subcategory extends Model<SubcategoryAttributes> {
  @PrimaryKey
  @AllowNull(false)
  @Column(DataType.INTEGER)
  id: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  name: string;

  @AllowNull(false)
  @ForeignKey(() => Category)
  @Column(DataType.INTEGER)
  typeId: number;

  @AllowNull(true)
  @ForeignKey(() => Grid)
  @Column(DataType.INTEGER)
  gridType: number;
  // @AllowNull(true)
  // @Column(DataType.INTEGER)
  // gridType: number;

  @HasOne(() => Category, { foreignKey: 'id'})
  category: Category;
}
