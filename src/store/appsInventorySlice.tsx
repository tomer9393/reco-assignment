import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface Application {
  appId: string;
  appName: string;
  category: string;
  appSources: string[];
}

interface AppsInventoryState {
  data: Application[] | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  previousPageNumber: number;
  previousPageSize: number;
}

const initialState: AppsInventoryState = {
  data: null,
  status: 'idle',
  error: null,
  pageNumber: 0,
  pageSize: 25,
  totalCount: 0,
  previousPageNumber: 0,
  previousPageSize: 25,
};

export const fetchAppsInventory = createAsyncThunk(
  'appsInventory/fetchAppsInventory',
  async ({ pageNumber, pageSize }: { pageNumber: number; pageSize: number }, thunkAPI) => {
    try {
      const response = await fetch('/api/v1/app-service/get-apps', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pageNumber,
          pageSize,
        }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data)
      return {
        applications: data.appRows,
        totalCount: data.totalCount,
        pageNumber,
        pageSize,
      };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const appsInventorySlice = createSlice({
  name: 'appsInventory',
  initialState,
  reducers: {
    setPageNumber: (state, action: PayloadAction<number>) => {
      state.pageNumber = action.payload;
    },
    setPageSize: (state, action: PayloadAction<number>) => {
      state.pageSize = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppsInventory.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(
        fetchAppsInventory.fulfilled,
        (
          state,
          action: PayloadAction<{ applications: Application[]; totalCount: number; pageNumber: number; pageSize: number }>
        ) => {
          state.status = 'succeeded';
          state.data = action.payload.applications;
          state.totalCount = action.payload.totalCount;
          state.previousPageNumber = action.payload.pageNumber;
          state.previousPageSize = action.payload.pageSize;
        }
      )
      .addCase(fetchAppsInventory.rejected, (state, action: any) => {
        state.status = 'failed';
        state.error = action.payload.message || 'Failed to fetch data';

        // rollback to previous pageNumber or pageSize if fetch is failed
        if (action.meta.arg.pageNumber !== state.previousPageNumber) {
          state.pageNumber = state.previousPageNumber;
        }
        if (action.meta.arg.pageSize !== state.previousPageSize) {
          state.pageSize = state.previousPageSize;
        }
      });
  },
});

export const { setPageNumber, setPageSize } = appsInventorySlice.actions;
export default appsInventorySlice.reducer;
