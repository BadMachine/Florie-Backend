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
import {Subcategory} from './Subcategory.model';

export interface CategoryAttributes {
  id: number;
  name: string;
  gridType: number;
}

@Table({
  tableName: TableName.Category,
})
export class Category extends Model<CategoryAttributes> {
  @PrimaryKey
  @AllowNull(false)
  @Column(DataType.INTEGER)
  id: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  name: string;

  @AllowNull(true)
  @ForeignKey(() => Grid)
  @Column(DataType.INTEGER)
  gridType: number;
  // @AllowNull(true)
  // @Column(DataType.INTEGER)
  // gridType: number;

  @HasOne(() => Grid)
  grid: Grid;

  @HasMany(() => Subcategory)
  subcategories: Subcategory[];
}
