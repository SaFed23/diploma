import { createSlice } from '@reduxjs/toolkit';
import reducers, { initialState } from './reportReducer';
import extraReducers from './reportExtra';

const reportSlice = createSlice({
  name: 'report',
  initialState,
  reducers,
  extraReducers,
});

export default reportSlice;
