import { configureStore } from '@reduxjs/toolkit';
import authReducer from "../features/authentication/authSlice"
import folderReducer from "../features/directories/folderSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    folders: folderReducer,
  }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch