import {
    TypedUseSelectorHook,
    useDispatch as dispatchHook,
    useSelector as selectorHook
  } from 'react-redux';
import type { RootState, AppThunk, AppDispatch } from './store'

export const useAppDispatch: () => AppDispatch = dispatchHook
export const useAppSelector: TypedUseSelectorHook<RootState> = selectorHook