import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import appsInventoryReducer from './appsInventorySlice';
import appDetailsReducer from './appDetailsSlice'

export const store = configureStore({
  reducer: {
    appsInventory: appsInventoryReducer,
    appDetails: appDetailsReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

// hooks for typescript
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;