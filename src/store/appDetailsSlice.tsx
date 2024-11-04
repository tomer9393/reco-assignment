import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface AppUser {
  email: string;
}

interface AppDetails {
  id: string;
  name: string;
  category: string;
  connector: string[];
  users: AppUser[];
}

interface AppsDetailsState {
  selectedApp: string | null;
  appData: AppDetails | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: AppsDetailsState = {
  selectedApp: null,
  appData: null,
  status: 'idle',
  error: null,
};

const headers = {
  'ngrok-skip-browser-warning': '69420',
  'Content-Type': 'application/json',
};

export const fetchAppData = createAsyncThunk(
  'appDetails/fetchAppData',
  async (appId: string, thunkAPI) => {
    try {
      const [appDetailsResponse, appUsersResponse] = await Promise.all([
        fetch(`/api/v1/app-service/get-app-overview/${appId}`, { headers }),
        fetch(`/api/v1/app-service/get-app-overview-users/${appId}`, { headers })
      ]);

      if (!appDetailsResponse.ok && !appUsersResponse.ok) {
        throw new Error('Failed to fetch both app details and user details');
      }

      const appDetails = appDetailsResponse.ok ? await appDetailsResponse.json() : null;
      const appUsers = appUsersResponse.ok ? await appUsersResponse.json() : null;

      const appData = {
        id: appDetails.appOverview.appId,
        name: appDetails.appOverview.appName,
        category: appDetails.appOverview.category,
        connector: [...appDetails.appOverview.appSources],
        users: [...appUsers.appUsers]
      }

      return { appData };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const appDetailsSlice = createSlice({
  name: 'appDetails',
  initialState,
  reducers: {
    handleSelectApp: (state, action: PayloadAction<string | null>) => {
      state.selectedApp = action.payload;
      state.appData = null;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppData.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchAppData.fulfilled, (state, action: PayloadAction<{ appData: AppDetails | null }>) => {
        state.appData = action.payload.appData;
        state.status = 'succeeded';
      })
      .addCase(fetchAppData.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to fetch data';
      });
  },
});

export const { handleSelectApp } = appDetailsSlice.actions;
export default appDetailsSlice.reducer;
