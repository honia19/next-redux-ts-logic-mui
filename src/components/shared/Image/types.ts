export interface IImage {
  id: string;
  size: number;
  fileName: string;
  width?: number;
  height?: number;
  alt: string;
  src: string;
  onSelectImage?: () => void;
  onToggleFavorite?: () => void;
  isFavorite?: boolean;
  isShowFavorite?: boolean;
}
