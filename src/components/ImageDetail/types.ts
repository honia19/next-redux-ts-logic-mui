import { IImage } from '../shared/Image/types';

export interface IImageDetail
  extends Pick<IImage, 'fileName' | 'size' | 'src'> {
  selectedImage: {
    description: string;
    uploadedBy: string;
    createdAt: string;
    updatedAt: string;
    dimensions: {
      height: number;
      width: number;
    };
    resolution: {
      height: number;
      width: number;
    };
    id: string;
  };
}
