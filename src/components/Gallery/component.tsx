'use client';

import { memo } from 'react';

import Image from '@/components/shared/Image';
import Spinner from '@/components/shared/Spinner';
import { IImageItem } from '@/types/images';

import useContainer from './hook';
import { ITab } from './types';

const GalleryComponent = ({ tab }: ITab) => {
  const { images, isLoaded, handleSelectImage } = useContainer({ tab });

  if (!isLoaded) {
    return <Spinner />;
  }

  return (
    <div>
      {images.map(({ id, url, filename, sizeInBytes }: IImageItem) => (
        <Image
          key={id}
          id={id}
          src={url}
          alt={filename}
          fileName={filename}
          size={sizeInBytes}
          width={200}
          height={200}
          onSelectImage={handleSelectImage(id)}
        />
      ))}
    </div>
  );
};

export default memo(GalleryComponent);
