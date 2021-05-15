import { createSlice } from '@reduxjs/toolkit';
import reducers, { initialState } from './loadingReducer';

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers,
});

export default loadingSlice;
