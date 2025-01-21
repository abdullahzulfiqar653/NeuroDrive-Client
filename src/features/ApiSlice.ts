import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient, { getTokenIncludedConfig } from '../services/apiClient';

interface ApiState {
  isLoading: boolean;
  error: string | null;
  response: any; // Use 'any' for flexibility, or create a type for the response data
}

const initialState: ApiState = {
  isLoading: false,
  error: null,
  response: {}, // Initialize response as an empty object
};

// Async Thunks for Fetch
export const fetchData = createAsyncThunk<any, string, { rejectValue: string }>(
  'api/fetchData',
  async (url, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(url, getTokenIncludedConfig());
      return response.data; // Return the response data
    } catch (error: any) {
      const errorMsg = error.response ? error.response.data : error.message;
      return rejectWithValue(errorMsg || 'Something went wrong');
    }
  }
);

// Async Thunk for Post
export const postData = createAsyncThunk<any, { url: string; payload: any }, { rejectValue: string }>(
  'api/postData',
  async ({ url, payload }, { rejectWithValue }) => {
    try {
      const response = await apiClient.post(url, payload, getTokenIncludedConfig());
      return response.data; // Return the response data
    } catch (error: any) {
      const errorMsg = error.response ? error.response.data : error.message;
      return rejectWithValue(errorMsg || 'Something went wrong');
    }
  }
);

// Slice Definition
const apiSlice = createSlice({
  name: 'api',
  initialState,
  reducers: {
    resetState: (state) => {
      state.isLoading = false;
      state.error = null;
      state.response = {}; // Reset response to an empty object
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Thunk
      .addCase(fetchData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.response = {}; // Reset response on pending state
      })
      .addCase(fetchData.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.response = action.payload; // Store fetched data
      })
      .addCase(fetchData.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.isLoading = false;
        state.error = action.payload || 'Something went wrong';
      })
      // Post Thunk
      .addCase(postData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.response = {}; // Reset response on pending state
      })
      .addCase(postData.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.response = action.payload; // Store posted data response
      })
      .addCase(postData.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.isLoading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
});

export const { resetState } = apiSlice.actions;

export default apiSlice.reducer;
