// eslint-disable-next-line import/named
import { schema } from 'normalizr';

// Define the images schema
export const imageSchema = new schema.Entity('images');
export const favoritedImageSchema = new schema.Entity('favoritedImages');

// Define the arrays schema
export const arrayOfImagesSchema = new schema.Array(imageSchema);
export const arrayOfFavoritedImagesSchema = new schema.Array(
  favoritedImageSchema,
);
