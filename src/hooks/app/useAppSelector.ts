import { TypedUseSelectorHook, useSelector } from 'react-redux';

import type { RootState } from '@/state/store/types';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
