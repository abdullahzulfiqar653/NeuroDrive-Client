import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient, { getTokenIncludedConfig } from '../../services/apiClient';
import { AxiosError } from 'axios';

export interface FolderState {
    directory: Folder | null; 
    directories: DirectoriesResponse | null; 
    isLoading: boolean;
    error: string | undefined | null;
  }

const initialState: FolderState = {
    directories: null,
    directory: {
        id: '',
        name: '',
        parent: null,
        children: [],
        files: [],
        shared_with: [],
      },
    isLoading: false,
    error: "",
}

export interface Folder {
    id: string;
    name: string;
    parent: string | null;
    children: Folder[];
    files: any[];
    shared_with: any[];
  }
  

export interface DirectoriesResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Folder[];
  }

export const getFolders = createAsyncThunk('folders/getFolders', async (_, { rejectWithValue }) => {
  try {
    const response = await apiClient.get('directories/', getTokenIncludedConfig());
    localStorage.setItem('parent_folder_id', response.data.results.id)
    return response.data; 
  } catch (error) {
    if(error instanceof AxiosError)
    return rejectWithValue(error.response?.data);
  }
});


export const createFolders = createAsyncThunk(
    'folders/createFolders',
    async (body: object, { rejectWithValue }) => {
      try {
        const response = await apiClient.post('directories/', body, getTokenIncludedConfig());
        return response.data; 
      } catch (error) {
        if(error instanceof AxiosError)
        return rejectWithValue(error.response?.data);
      }
    }
);

export const getDirectory = createAsyncThunk(
    'folders/getDirectory',
    async (id: string, { rejectWithValue }) => {
      try {
        const response = await apiClient.get(`directories/${id}`, getTokenIncludedConfig());
        return response.data; 
      } catch (error) {
        if(error instanceof AxiosError)
        return rejectWithValue(error.response?.data);
      }
    }
);
  

const folderSlice = createSlice({
  name: 'folders',
  initialState,
  reducers: {}, 
  extraReducers: (builder) => {

    builder.addCase(getFolders.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getFolders.fulfilled, (state, action) => {
      state.isLoading = false;
      state.directories = action.payload;
    });
    builder.addCase(getFolders.rejected, (state, action) => {
      state.isLoading = false;
      state.error =  (typeof action.payload === 'string' || action.payload === null || action.payload === undefined) ? action.payload : 'Unkown Error';
    });

    builder.addCase(createFolders.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(createFolders.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(createFolders.rejected, (state, action) => {
      state.isLoading = false;
      state.error = (typeof action.payload === 'string' || action.payload === null || action.payload === undefined) ? action.payload : 'Unkown Error';
    });

      builder.addCase(getDirectory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      });
      builder.addCase(getDirectory.fulfilled, (state,action) => {
        state.isLoading = false;
        state.directory=action.payload;
      });
      builder.addCase(getDirectory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (typeof action.payload === 'string' || action.payload === null || action.payload === undefined) ? action.payload : 'Unkown Error';
      });
  },
});

export default folderSlice.reducer;