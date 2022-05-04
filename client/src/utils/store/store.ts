import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { articleApi } from './api/article';
import articleReducer from './slices/article';

const store = configureStore({
  reducer: {
    article: articleReducer,
    [articleApi.reducerPath]: articleApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(articleApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
