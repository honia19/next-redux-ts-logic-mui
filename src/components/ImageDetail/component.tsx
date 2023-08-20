import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import { memo } from 'react';

import { StyledCustomButton } from '@/components/shared/Button/styled';

import Image from '../shared/Image';

import useContainer from './hook';
import { IImageDetail } from './types';

const ImageDetailComponent = ({
  src,
  fileName,
  size,
  selectedImage,
}: IImageDetail) => {
  const {
    description,
    uploadedBy,
    createdAt,
    updatedAt,
    dimensions,
    resolution,
    id,
  } = selectedImage;
  const {
    toggleFavoriteImage,
    isFavoriteSelectedImage,
    handleRemoveFavoriteImage,
    handleCloseDetailImage,
  } = useContainer();

  return (
    <section className="h-full p-5">
      <Image
        id={id}
        src={src}
        alt={fileName.split('.')[0]}
        size={size}
        fileName={fileName}
        width={400}
        height={400}
        onToggleFavorite={toggleFavoriteImage(selectedImage)}
        isShowFavorite
        isFavorite={isFavoriteSelectedImage}
      />
      <section className="mt-4 text-sm">
        <Typography variant="h6" className="border-b font-medium">
          Information
        </Typography>
        <div className="flex-between border-b-loose">
          <p className="text-grey-text">Uploaded by</p>
          <p className="font-medium">{uploadedBy}</p>
        </div>
        <div className="flex-between border-b-loose">
          <p className="text-grey-text">Created</p>
          <p className="font-medium">
            {dayjs(createdAt).format('MMMM D, YYYY')}
          </p>
        </div>
        <div className="flex-between border-b-loose">
          <p className="text-grey-text">Last modified</p>
          <p className="font-medium">
            {dayjs(updatedAt).format('MMMM D, YYYY')}
          </p>
        </div>
        <div className="flex-between border-b-loose">
          <p className="text-grey-text">Dimensions</p>
          <p className="font-medium">{`${dimensions.width} x ${dimensions.height}`}</p>
        </div>
        <div className="flex-between border-b-loose">
          <p className="text-grey-text">Resolution</p>
          <p className="font-medium">{`${resolution.width} x ${resolution.height}`}</p>
        </div>
      </section>
      <section className="mt-4 text-sm font-medium">
        <Typography variant="h6">Description</Typography>
        <p className="font-normal text-grey-text">{description ?? 'N/a'}</p>
      </section>
      <section className="mt-4 flex justify-between gap-5">
        <StyledCustomButton
          onClick={handleCloseDetailImage}
          fontWeight={500}
          fontSize={14}
          width="100%"
          height={35}
          borderColor="#98a4b5"
        >
          Close
        </StyledCustomButton>
        <StyledCustomButton
          onClick={handleRemoveFavoriteImage(id)}
          fontWeight={500}
          fontSize={14}
          width="100%"
          height={35}
          borderColor="#98a4b5"
        >
          Delete
        </StyledCustomButton>
      </section>
    </section>
  );
};

export default memo(ImageDetailComponent);
