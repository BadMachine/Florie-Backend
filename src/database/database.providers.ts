import { Sequelize } from 'sequelize-typescript';
import {Product, Category, Grid, Subcategory} from '../models';
import dotEnv = require('dotenv');
dotEnv.config();

const sslSetting = process.env.DB_USE_SSL
  ? {
      ssl: {
        rejectUnauthorized: false,
      },
    }
  : {};

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        define: {
          freezeTableName: true,
        },
        dialect: 'postgres',
        logging: true,
        dialectOptions: {
          ...sslSetting,
        },

        host: process.env.DB_HOST,
        port: process.env.DB_PORT as unknown as number,
        username: process.env.DB_USER as unknown as string,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
      });

      sequelize.addModels([
        Product,
        Category,
        Grid,
        Subcategory,
      ]);

      // await sequelize.sync();

      return sequelize;
    },
  },
];
