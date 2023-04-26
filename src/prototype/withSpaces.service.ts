import { OnModuleInit } from '@nestjs/common';
import { Model } from 'sequelize-typescript';
import { v4 } from 'uuid';

import { randomUUID } from 'crypto';
// import { CategoryModel } from 'database/models/Category/Category.model';
// import { ShopCategoryModel } from 'database/models/ShopCategory/ShopCategory.model';
// import { TranslationModel } from 'database/models/Translation/Translation.model';
// import * as sharp from 'sharp';
// import { getImageSizes, ImageSizeReferences, Size } from 'utils/utils';
import { Product } from '../models';
import {TableName} from '../constants';
import { SpacesService } from '../spaces/spaces.service';
import {getImageSizes, ImageSizeReferences, Size} from '../utils';
import * as sharp from 'sharp';

type SpaceModel = Product; // | ShopModel | ProductModel | CategoryModel;

export class ServiceWithSpaces implements OnModuleInit {
  private spaces;
  private readonly model;
  private readonly tableName: TableName;

  constructor(spacesService: SpacesService, model: typeof Model<any>) {
    this.spaces = spacesService;
    this.model = model;
    this.tableName = model.getTableName() as TableName;
  }

  onModuleInit() {
    const tableName = this.model.getTableName();
    let beforeDeleteHook: (
      instance: SpaceModel,
    ) => Promise<void> = async () => {
      return null;
    };
    let beforeCreateHook: (instance: SpaceModel) => Promise<void> = async () => {
      return null;
    };
    let afterUpdateHook: (instance: SpaceModel) => Promise<void> = async () => {
      return null;
    };
    let afterDeleteHook: (instance: SpaceModel) => Promise<void> = async () => {
      return null;
    };

    switch (tableName) {
      // case TableName.PAPER: {
      //   afterCreateHook = this.afterCreatePaper.bind(this);
      //   afterUpdateHook = this.updatePaper.bind(this);
      //   afterDeleteHook = this.deleteFolder.bind(this);
      //   break;
      // }
      case TableName.PRODUCT: {
        beforeCreateHook = this.beforeCreateProduct.bind(this);
        afterUpdateHook = this.updateProduct.bind(this);
        afterDeleteHook = this.deleteProduct.bind(this);
        break;
      }
      // case TableName.SHOP: {
      //   afterCreateHook = this.afterCreateShop.bind(this);
      //   afterUpdateHook = this.updateShop.bind(this);
      //   afterDeleteHook = this.deleteShop.bind(this);
      //
      //   break;
      // }
      // case TableName.CATEGORY: {
      //   beforeDeleteHook = this.deleteCategoryRelations.bind(this);
      //
      //   break;
      // }
      default:
        break;
    }

    this.model.beforeValidate(beforeCreateHook);
    this.model.beforeDestroy(beforeDeleteHook);
    this.model.afterDestroy(afterDeleteHook);
    this.model.afterUpdate(afterUpdateHook);
  }

  // Main hook methods section
  async beforeCreateProduct(instance: Product) {
    await this.uploadImage(instance);
  }

  // async afterCreatePaper(instance: PaperModel) {
  //   await this.uploadLogo(instance);
  //   await this.uploadImages(instance);
  // }

  // async afterCreateShop(instance: ShopModel) {
  //   await this.uploadLogo(instance);
  // }

  async updateProduct(instance: Product) {
    await this.uploadImage(instance);
  }

  // async updatePaper(instance: PaperModel) {
  //   const imagesToDelete = instance
  //     .previous('imagesUrls')
  //     .filter((url) => !instance.imagesUrls.includes(url));
  //
  //   const filenames = imagesToDelete.map((url) => url.split('/').pop());
  //   await this.spaces.deleteFiles(
  //     `${this.tableName}/${instance.id}`,
  //     filenames,
  //   );
  //   await this.uploadImages(instance);
  // }

  // async updateShop(instance: ShopModel) {
  //   await this.uploadLogo(instance);
  // }

  async deleteProduct(instance: Product) {
    await this.deleteFolder(instance);
  }

  // async deleteShop(instance: ShopModel) {
  //   const products = instance.products;
  //   const deletedProducts = products.map(async (product) =>
  //     product.destroy({ hooks: true }),
  //   );
  //
  //   await Promise.all(deletedProducts);
  //
  //   await this.deleteFolder(instance);
  // }

  // Utility methods
  // async uploadImages(instance: PaperModel) {
  //   const mainPath = `${this.tableName}/${instance.id}`;
  //
  //   if (instance?.images?.length) {
  //     const imageNames = Array(instance.images.length)
  //       .fill(null)
  //       .map(() => randomUUID());
  //     const largeImages = instance.images.map(async (image, idx) => {
  //       const { large, format } = await this.createResizedCopies(image.buffer);
  //       return await this.spaces.uploadFile(
  //         this.spaces.createMulterLikeFile(large, ''),
  //         [mainPath, 'large'],
  //         `${imageNames[idx]}.${format}`,
  //       );
  //     });
  //
  //     const smallImages = instance.images.map(async (image, idx) => {
  //       const { small, format } = await this.createResizedCopies(image.buffer);
  //       return await this.spaces.uploadFile(
  //         this.spaces.createMulterLikeFile(small, ''),
  //         [mainPath, 'small'],
  //         `${imageNames[idx]}.${format}`,
  //       );
  //     });
  //
  //     const imagesUrls = await Promise.all(largeImages);
  //     await Promise.all(smallImages);
  //
  //     await this.model.update(
  //       {
  //         imagesUrls,
  //       },
  //       { where: { id: instance.id } },
  //     );
  //   }
  // }

  async uploadImage(instance: Product) {
    if (!instance?.id) {
      instance.id = v4();
    }

    if (instance.imageFile) {
      const { small, large, format } = await this.createResizedCopies(
        instance.imageFile.buffer,
      );

      const mainPath = `${this.tableName}/${instance.id}`;
      const image = await this.spaces.uploadFile(
        this.spaces.createMulterLikeFile(large, 'logo'),
        [mainPath, 'logo', 'large'],
        `logo.${format}`,
      );

      await this.spaces.uploadFile(
        this.spaces.createMulterLikeFile(small, 'logo'),
        [mainPath, 'logo', 'small'],
        `logo.${format}`,
      );

      instance.image = image;
      // await this.model.update({ image }, { where: { id: instance.id } });
    }
  }

  async createResizedCopies(imageBuffer: Buffer) {
    const getResizedImages = async (sizeReferences: ImageSizeReferences) => {
      const sharpImage = sharp(imageBuffer);
      const metadata = await sharpImage.metadata();
      const { width, height } = metadata;
      const { width: largeWidth, height: largeHeight } = sizeReferences.large;
      const { height: smallWidth, width: smallHeight } = sizeReferences.small;

      const resize = async ({
                              width,
                              height,
                            }: Partial<Size>): Promise<Buffer> => {
        let result: Buffer;

        if (width) {
          result = await sharpImage
            .resize({
              fit: sharp.fit.contain,
              width,
            })
            .webp({ quality: 100 })
            .toBuffer();
        } else if (height) {
          result = await sharpImage
            .resize({
              fit: sharp.fit.contain,
              height,
            })
            .webp({ quality: 100 })
            .toBuffer();
        } else {
          result = await sharpImage.toBuffer();
        }

        return result;
      };

      const getLargeImageWithMaxima = async ({
   requiredHeight,
   requiredWidth,
   imageHeight,
   imageWidth,
 }: {
        requiredHeight: number;
        requiredWidth: number;
        imageHeight: number;
        imageWidth: number;
      }) => {
        let result;
        const requiredAspectRatio = (requiredHeight / requiredWidth).toFixed(2);
        const imageAspectRatio = (imageHeight / imageWidth).toFixed(2);

        if (imageWidth < requiredWidth && imageHeight < requiredHeight) {
          return imageBuffer;
        }

        if (imageAspectRatio > requiredAspectRatio) {
          result = await resize({ height: requiredHeight });
        } else {
          if (imageAspectRatio === requiredAspectRatio) {
            result = await resize({ height: requiredHeight });
          } else {
            result = await resize({ width: requiredWidth });
          }
        }

        return result;
      };

      const large = await getLargeImageWithMaxima({
        requiredHeight: largeHeight,
        requiredWidth: largeWidth,
        imageWidth: width,
        imageHeight: height,
      });
      const small = await getLargeImageWithMaxima({
        requiredHeight: smallHeight,
        requiredWidth: smallWidth,
        imageWidth: width,
        imageHeight: height,
      });

      const { format } = await sharp(large).metadata();

      return { large, small, format };
    };

    const imageSizesReference = getImageSizes(this.tableName);

    return getResizedImages(imageSizesReference);
  }

  async deleteFolder(instance: Product) {
    const mainPath = `${this.tableName}/${instance.id}`;

    await this.spaces.deleteFolder(mainPath);
  }
  // async deleteCategoryRelations(instance: CategoryModel) {
  //   const products = await ProductModel.findAll({
  //     include: [
  //       {
  //         model: ShopCategoryModel,
  //         as: 'shopCategory',
  //         required: true,
  //         where: {
  //           categoryId: instance.id,
  //         },
  //       },
  //     ],
  //   });
  //
  //   const translations = products.map((product) => product.translationId);
  //
  //   const deleteNamesPromise = translations.map(async (id) =>
  //     TranslationModel.destroy({ where: { id } }),
  //   );
  //
  //   const deleteProductsPromise = products.map(async (product) =>
  //     product.destroy({ hooks: true }),
  //   );
  //
  //   await Promise.all(deleteNamesPromise);
  //   await Promise.all(deleteProductsPromise);
  // }
}
