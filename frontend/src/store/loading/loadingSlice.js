import { createSlice } from '@reduxjs/toolkit';
import reducers, { initialState } from './loadingReducer';

const userSlice = createSlice({
  name: 'loading',
  initialState,
  reducers,
});

export default userSlice;
