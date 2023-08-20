'use client';

import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { IconButton } from '@mui/material';
import clsx from 'clsx';
import Image from 'next/image';
import { memo } from 'react';

import convertBytes, { Unit } from '../../../utils/convertSize';

import useContainer from './hook';
import { IImage } from './types';

const ImageComponent = ({
  id,
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
  const { selectedImageId } = useContainer();

  return (
    <button
      data-testid={`image-btn-${id}`}
      onClick={onSelectImage}
      className={clsx('flex flex-col', {
        'm-auto': isShowFavorite,
      })}
    >
      <>
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={clsx('custom-image', {
            'custom-image-full': isShowFavorite,
            'custom-image-selected': !isShowFavorite && id === selectedImageId,
          })}
        />
      </>
      <div
        className={clsx({
          flex: isShowFavorite,
          'flex-row': isShowFavorite,
          'justify-between': isShowFavorite,
          'w-full': isShowFavorite,
        })}
      >
        <div className="flex w-44 flex-col items-start text-sm">
          <p className="w-44 truncate text-left font-medium">{fileName}</p>
          <p className="text-grey-text">{convertBytes(size, Unit.Megabytes)}</p>
        </div>
        {isShowFavorite && (
          <IconButton onClick={onToggleFavorite}>
            {isFavorite ? (
              <FavoriteIcon fontSize="small" color="error" />
            ) : (
              <FavoriteBorderIcon fontSize="small" />
            )}
          </IconButton>
        )}
      </div>
    </button>
  );
};

export default memo(ImageComponent);
