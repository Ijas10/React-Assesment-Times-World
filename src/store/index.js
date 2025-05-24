import { configureStore } from '@reduxjs/toolkit';
import regionFilterReducer from './regionFilterSlice';

export const store = configureStore({
  reducer: {
    regionFilter: regionFilterReducer
  }
});