import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../services/apiClient';
import { AxiosError } from 'axios';

export interface FolderState {
    seeds: string;
    isAuthenticated: boolean | undefined;
    isSeedsLoading: boolean;
    isTokenLoading: boolean;
    error: string | undefined | null;
  }

const initialState: FolderState = {
    seeds: '',
    isAuthenticated: false,
    isSeedsLoading: false,
    isTokenLoading: false,
    error: "",
}

export const getFolders = createAsyncThunk('folders/getFolders', async (_, { rejectWithValue }) => {
  try {
    const response = await apiClient.post('directories/');
    return response.data; 
  } catch (error) {
    if(error instanceof AxiosError)
    return rejectWithValue(error.response?.data);
  }
  finally{
    
  }
});


export const createFolders = createAsyncThunk(
    'folders/createFolders',
    async (pass_phrase: string, { rejectWithValue }) => {
      try {
        const response = await apiClient.post('/user/generate-token/', { pass_phrase });
        return response.data; 
      } catch (error) {
        if(error instanceof AxiosError)
        return rejectWithValue(error.response?.data);
      }
    }
);
  

const authSlice = createSlice({
  name: 'folders',
  initialState,
  reducers: {}, 
  extraReducers: (builder) => {

    builder.addCase(getFolders.pending, (state) => {
      state.isSeedsLoading = true;
      state.error = null;
    });
    builder.addCase(getFolders.fulfilled, (state, action) => {
      state.isSeedsLoading = false;
      state.seeds = action.payload;
    });
    builder.addCase(getFolders.rejected, (state, action) => {
      state.isSeedsLoading = false;
      state.error =  (typeof action.payload === 'string' || action.payload === null || action.payload === undefined) ? action.payload : 'Unkown Error';
    });

    builder.addCase(createFolders.pending, (state) => {
      state.isTokenLoading = true;
      state.error = null;
    });
    builder.addCase(createFolders.fulfilled, (state) => {
      state.isTokenLoading = false;
    });
    builder.addCase(createFolders.rejected, (state, action) => {
      state.isTokenLoading = false;
      state.error = (typeof action.payload === 'string' || action.payload === null || action.payload === undefined) ? action.payload : 'Unkown Error';
    });
  },
});

export default authSlice.reducer;