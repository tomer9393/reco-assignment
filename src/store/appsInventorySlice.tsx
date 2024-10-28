import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Application } from '../types';

interface AppsInventoryState {
  data: Application[] | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  pageNumber: number;
}

const initialState: AppsInventoryState = {
  data: null,
  status: 'idle',
  error: null,
  pageNumber: 0,
};

export const appsInventorySlice = createSlice({
  name: 'appsInventory',
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<Application[]>) => {
      state.data = action.payload;
      state.status = 'succeeded';
    },
    setLoading: (state) => {
      state.status = 'loading';
    },
    setError: (state, action: PayloadAction<string>) => {
      state.status = 'failed';
      state.error = action.payload;
    },
  },
});

export const { setData, setLoading, setError } = appsInventorySlice.actions;

export default appsInventorySlice.reducer;
