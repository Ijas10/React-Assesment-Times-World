import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  region: 'All',
  visibleCount: 12, 
  allCountries: [], 
  loading: false,
  error: null
};

export const regionFilterSlice = createSlice({
  name: 'regionFilter',
  initialState,
  reducers: {
    setRegion: (state, action) => {
      state.region = action.payload;
      state.visibleCount = 12; 
    },
    loadMore: (state) => {
      state.visibleCount += 12;
    },
    setCountries: (state, action) => {
      state.allCountries = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  }
});

export const { setRegion, loadMore, setCountries, setLoading, setError } = regionFilterSlice.actions;
export default regionFilterSlice.reducer;