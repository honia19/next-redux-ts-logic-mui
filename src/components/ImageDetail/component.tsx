import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import { memo } from 'react';

import Image from '../shared/Image';

import useContainer from './hook';
import { IImageDetail } from './types';

const ImageComponent = ({
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
  } = useContainer();

  return (
    <section className="detail-section">
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
      <section className="detail-section__information">
        <Typography variant="h6" borderBottom={5} />
        <div>
          <p>Uploaded by</p>
          <strong>{uploadedBy}</strong>
        </div>
        <div>
          <p>Created</p>
          <strong>{dayjs(createdAt).format('MMMM D, YYYY')}</strong>
        </div>
        <div>
          <p>Last modified</p>
          <strong>{dayjs(updatedAt).format('MMMM D, YYYY')}</strong>
        </div>
        <div>
          <p>Dimensions</p>
          <strong>{`${dimensions.width} x ${dimensions.height}`}</strong>
        </div>
        <div>
          <p>Resolution</p>
          <strong>{`${resolution.width} x ${resolution.height}`}</strong>
        </div>
      </section>
      <section className="detail-section__description">
        <Typography variant="h5" />
        <p>{description}</p>
      </section>
      <Button onClick={handleRemoveFavoriteImage(id)}>Delete</Button>
    </section>
  );
};

export default memo(ImageComponent);
