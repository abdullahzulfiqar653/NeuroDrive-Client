import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient, { getTokenIncludedConfig } from '../services/apiClient';

interface ApiState {
  isLoading: boolean;
  error: string | null;
  response: any; 
}

const initialState: ApiState = {
  isLoading: false,
  error: null,
  response: {}, 
};

// Async Thunks for Fetch
export const fetchData = createAsyncThunk<any, string, { rejectValue: string }>(
  'api/fetchData',
  async (url, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(url, getTokenIncludedConfig());
      return response.data; 
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || error.message || 'Something went wrong';
      return rejectWithValue(errorMsg );
    }
  }
);

export const postData = createAsyncThunk<any, { url: string; payload: any, method: "post" | "put" | "patch"  }, { rejectValue: string }>(
  'api/postData',
  async ({ url, payload, method}, { rejectWithValue }) => {
    try {
        let config = getTokenIncludedConfig();

       
        if (payload instanceof FormData) {
          config = {
            headers: {
          
              accept: "application/json",
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
              'Content-Type': 'multipart/form-data',
            },
          };
        }
  
    const response = await apiClient({
        method: method,  
        url,
        data: payload,   
        ...config,       
      });

      return response.data; 
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
      state.response = {}; 
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Thunk
      .addCase(fetchData.pending, (state) => {
        state.isLoading = true;
        state.error = 'Something went wrong'
        state.response = {}; 
      })
      .addCase(fetchData.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.response = action.payload;
      })
      .addCase(fetchData.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.isLoading = false;
        state.error = action.payload || 'Something went wrong';
      })
      // Post Thunk
      .addCase(postData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.response = {}; 
      })
      .addCase(postData.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.response = action.payload; 
      })
      .addCase(postData.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.isLoading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
});

export const { resetState } = apiSlice.actions;

export default apiSlice.reducer;
