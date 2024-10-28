import { configureStore } from '@reduxjs/toolkit';
import appsInventoryReducer from './appsInventorySlice';

export const store = configureStore({
  reducer: {
    appsInventory: appsInventoryReducer,
  },
});

export default store;