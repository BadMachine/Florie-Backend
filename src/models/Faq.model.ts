
import {TableName, withoutTimestamps} from '../constants';
import {
  AllowNull,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table
} from 'sequelize-typescript';

export interface FAQAttributes {
  id: number;
  question: string;
  answer: string;
}

@Table({
  tableName: TableName.FAQ,
})
export class FAQ extends Model<FAQAttributes> {
  @PrimaryKey
  @AllowNull(false)
  @Column(DataType.INTEGER)
  id: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  question: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  answer: number;
}
