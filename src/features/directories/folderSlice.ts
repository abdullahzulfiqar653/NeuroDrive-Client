import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient, { getTokenIncludedConfig } from '../../services/apiClient';
import { AxiosError } from 'axios';

export interface FolderState {
    files: FilesResponse | null;
    directory: Folder | null; 
    isLoading: boolean;
    error: string | undefined | null;
  }

const initialState: FolderState = {
    files: null,
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

interface Files {
  id: string;
  url: string;
  name: string;
  file: string;
  size: number;
  metadata?: Record<string, any>;
  password?: string;
  directory?: string;
  is_starred?: boolean;
  content_type: string;
  user_address?: string;
  shared_accesses?: any[];
  is_remove_metadata?: boolean;
  is_remove_password?: boolean;
  is_giving_permission?: boolean;
  is_password_protected: boolean;
}

export interface FilesResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Files[];
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

  interface GetFilesParams {
    page?: number;
    size?: number;
    search?: string;
  }

// export const getFiles = createAsyncThunk('directories/getFiles', async (_, { rejectWithValue }) => {
//   try {
//     const response = await apiClient.get(`directories/${localStorage.getItem("parent_folder_id")}/files/`, getTokenIncludedConfig());
//     return response.data; 
//   } catch (error) {
//     if(error instanceof AxiosError)
//     return rejectWithValue(error.response?.data);
//   }
// });
export const getFiles = createAsyncThunk(
  'directories/getFiles',
  async (params: GetFilesParams = {},  { rejectWithValue }) => {
    try {
      const parentFolderId = localStorage.getItem("parent_folder_id");
      
      const queryParams: Record<string, any> = {};
      if (params?.page !== undefined) queryParams.page = params.page;
      if (params?.size !== undefined) queryParams.size = params.size;
      if (params?.search) queryParams.search = params.search;

      const response = await apiClient.get(
        `directories/${parentFolderId}/files/`,
        {
          params, // Send only if they exist
          ...getTokenIncludedConfig(),
        }
      );
      return response.data; 
    } catch (error) {
      if (error instanceof AxiosError) return rejectWithValue(error.response?.data);
    }
  }
);


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

    builder.addCase(getFiles.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getFiles.fulfilled, (state, action) => {
      state.isLoading = false;
      state.files = action.payload;
    });
    builder.addCase(getFiles.rejected, (state, action) => {
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