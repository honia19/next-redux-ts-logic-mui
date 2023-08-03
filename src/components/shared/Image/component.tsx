'use client';

import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { IconButton } from '@mui/material';
import Image from 'next/image';
import { memo } from 'react';

import convertBytes, { Unit } from '../../../utils/convertSize';

import { IImage } from './types';

const ImageComponent = ({
  src,
  alt,
  fileName,
  size,
  width,
  height,
  isFavorite = false,
  isShowFavorite = false,
  onSelectImage,
  onToggleFavorite,
}: IImage) => {
  return (
    <div role="button" onClick={onSelectImage} className="image">
      <Image src={src} alt={alt} width={width} height={height} />
      <div className="image__description">
        <p className="image__description-name">{fileName}</p>
        <p className="image__description-size">
          {convertBytes(size, Unit.Megabytes)}
        </p>
      </div>
      {isShowFavorite && (
        <IconButton onClick={onToggleFavorite}>
          {isFavorite ? (
            <FavoriteIcon fontSize="small" />
          ) : (
            <FavoriteBorderIcon fontSize="small" />
          )}
        </IconButton>
      )}
    </div>
  );
};

export default memo(ImageComponent);
