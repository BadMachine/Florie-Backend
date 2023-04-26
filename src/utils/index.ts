import {TableName} from '../constants';

export type Size = {
  width: number;
  height: number;
};

export type ImageSizeReferences = {
  small: Size;
  large: Size;
};
export const getImageSizes = (tableType: TableName): ImageSizeReferences => {
  const getSizes = (envKey: string) => {
    const [width, height] = process.env[envKey].split('x');

    return { width: Number(width), height: Number(height) };
  };

  let small = {
    width: 0,
    height: 0,
  };
  let large = {
    width: 0,
    height: 0,
  };

  switch (tableType) {
    // case TableName.SHOP: {
    //   small = getSizes('SHOP_IMAGE_SIZE_SMALL');
    //   large = getSizes('SHOP_IMAGE_SIZE_LARGE');
    //
    //   break;
    // }
    case TableName.PRODUCT: {
      small = getSizes('PRODUCT_IMAGE_SIZE_SMALL');
      large = getSizes('PRODUCT_IMAGE_SIZE_LARGE');

      break;
    }
    // case TableName.PAPER: {
    //   small = getSizes('PAPER_IMAGE_SIZE_SMALL');
    //   large = getSizes('PAPER_IMAGE_SIZE_LARGE');
    //
    //   break;
    // }

    default:
      break;
  }
  return { small, large };
};
