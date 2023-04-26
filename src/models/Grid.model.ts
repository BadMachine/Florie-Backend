import {AllowNull, Column, DataType, ForeignKey, HasMany, Model, PrimaryKey, Table} from 'sequelize-typescript';
import {TableName} from '../constants';
import {Category} from './Category.model';

export interface GridAttributes {
  id: number;
  name: string;
  gridType: number;
}

@Table({
  tableName: TableName.Grid,
})
export class Grid extends Model<GridAttributes> {
  @PrimaryKey
  @AllowNull(false)
  @Column(DataType.INTEGER)
  id: string;

  @AllowNull(false)
  @Column(DataType.ARRAY(DataType.STRING))
  sizes: string;

  @AllowNull(true)
  @ForeignKey(() => Category)
  @Column({
    type: DataType.INTEGER,
  })
  category_fk: number;

  @HasMany(() => Category, { as: 'Categories' })
  Categories: Category[];
}
