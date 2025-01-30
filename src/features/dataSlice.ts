import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import fetchData from '../api/fetchData';

interface DataState {
  data: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: DataState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchJsonData = createAsyncThunk('data/fetchJsonData', async () => {
  const data = await fetchData();
  return data;
});

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJsonData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchJsonData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchJsonData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch data';
      });
  },
});

export default dataSlice.reducer;
