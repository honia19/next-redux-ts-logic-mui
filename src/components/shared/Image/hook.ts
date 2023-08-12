import { useAppSelector } from '@/hooks/app/useAppSelector';
import { selectedImageIdSelector } from '@/state/concepts/images/imageSlice';

const useContainer = () => {
  const selectedImageId = useAppSelector(selectedImageIdSelector);

  return {
    selectedImageId,
  };
};

export default useContainer;
