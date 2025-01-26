import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient, { getTokenIncludedConfig } from '../services/apiClient';

interface ApiCallState {
  isLoading: boolean;
  error: string | null;
  response: any;
}

interface ApiState {
  calls: { [key: string]: ApiCallState }; // Keyed by API identifier
}

const initialState: ApiState = {
  calls: {},
};

// Fetch Data Thunk
export const fetchData = createAsyncThunk<
  { data: any; status: number },
  { url: string; key: string }, // Add `key` to the argument type
  { rejectValue: string }
>('api/fetchData', async ({ url }, { rejectWithValue }) => {
  try {
    const response = await apiClient.get(url, getTokenIncludedConfig());
    return { data: response.data, status: response.status }; 
  } catch (error: any) {
    const errorMsg = error.response?.data || error.message || 'Something went wrong';
    return rejectWithValue(errorMsg);
  }
});

// Post Data Thunk
export const postData = createAsyncThunk<
  
  { data: any; status: number },
  { url: string; payload: any; method: 'post' | 'put' | 'patch'; key: string },
  { rejectValue: string }
>('api/postData', async ({ url, payload, method }, { rejectWithValue }) => {
  try {
    let config = getTokenIncludedConfig();

    // Adjust headers if payload is a FormData object
    if (payload instanceof FormData) {
      config = {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          'Content-Type': 'multipart/form-data',
        },
      };
    }
    const response = await apiClient({
      method,
      url,
      data: payload,
      ...config,
    });
    
    return { data: response.data, status: response.status }; 
  } catch (error: any) {
    const errorMsg = error.response ? error.response.data : error.message;
    return rejectWithValue(errorMsg || 'Something went wrong');
  }
});

// Slice Definition
// const apiSlice = createSlice({
//   name: 'api',
//   initialState,
//   reducers: {
//     resetState: (state) => {
//       state.calls = {}; 
//     },
//     resetCallState: (state, action: PayloadAction<string>) => {
//       delete state.calls[action.payload];
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchData.pending, (state, action) => {
//         const key = action.meta.arg.key;
//         state.calls[key] = {
//           isLoading: true,
//           error: null,
//           response: null,
//         };
//       })
//       .addCase(fetchData.fulfilled, (state, action) => {
//         const key = action.meta.arg.key;
//         state.calls[key] = {
//           isLoading: false,
//           error: null,
//           response: action.payload,
//         };
//       })
//       .addCase(fetchData.rejected, (state, action) => {
//         const key = action.meta.arg.key;
//         console.log(action,"  ", state)

//         state.calls[key] = {
//           isLoading: false,
//           error: action.payload || 'Something went wrong',
//           response: null,
//         };
//       })
//       // Handle Post Thunk
//       .addCase(postData.pending, (state, action) => {
//         const key = action.meta.arg.key; 
//         state.calls[key] = {
//           isLoading: true,
//           error: null,
//           response: null,
//         };
//       })
//       .addCase(postData.fulfilled, (state, action) => {
//         const key = action.meta.arg.key;
//         state.calls[key] = {
//           isLoading: false,
//           error: null,
//           response: action.payload,
//         };
//       })
//       .addCase(postData.rejected, (state, action) => {
//         const key = action.meta.arg.key;
//         state.calls[key] = {
//           isLoading: false,
//           error: action.payload || 'Something went wrong',
//           response: null,
//         };
//       });
//   },
// });
const apiSlice = createSlice({
  name: 'api',
  initialState,
  reducers: {
    resetState: (state) => {
      console.log('Resetting entire state:', state);
      state.calls = {};
    },
    resetCallState: (state, action: PayloadAction<string>) => {
      console.log('Resetting state for key:', action.payload);
      delete state.calls[action.payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state, action) => {
        const key = action.meta.arg.key;
        state.calls[key] = {
          isLoading: true,
          error: null,
          response: null,
        };
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        const key = action.meta.arg.key;
        state.calls[key] = {
          isLoading: false,
          error: null,
          response: {
            data: action.payload.data,
            status: action.payload.status, // Store the status code
          },
        };
      })
      .addCase(fetchData.rejected, (state, action) => {
        const key = action.meta.arg.key;
        state.calls[key] = {
          isLoading: false,
          error: action.payload || 'Something went wrong',
          response: null,
        };
      })
      .addCase(postData.pending, (state, action) => {
        const key = action.meta.arg.key;
        state.calls[key] = {
          isLoading: true,
          error: null,
          response: null,
        };
      })
      .addCase(postData.fulfilled, (state, action) => {
        const key = action.meta.arg.key;
        state.calls[key] = {
          isLoading: false,
          error: null,
          response: {
            data: action.payload.data,
            status: action.payload.status, // Store the status code
          },
        };
      })
      .addCase(postData.rejected, (state, action) => {
        const key = action.meta.arg.key;
        state.calls[key] = {
          isLoading: false,
          error: action.payload || 'Something went wrong',
          response: null,
        };
      });
  },
});



export const { resetState, resetCallState } = apiSlice.actions;

export default apiSlice.reducer;