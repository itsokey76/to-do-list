import { configureStore } from '@reduxjs/toolkit'
import taskItemsSlice from './slices/taskItemsSlice';
import attributesSlice from './slices/attributesSlice';
import filterSlice from './slices/filterSlice';
import foldersSlice from './slices/foldersSlice';
// ...

const store = configureStore({
  reducer: {
    taskItems: taskItemsSlice,
    attributes: attributesSlice,
    filters: filterSlice,
    folders: foldersSlice
  },
})

export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch