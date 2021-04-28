import { createSlice } from '@reduxjs/toolkit';
import reducers, { initialState } from './commentReducer';
import extraReducers from './commentExtra';

const featureSlice = createSlice({
  name: 'comment',
  initialState,
  reducers,
  extraReducers,
});

export default featureSlice;
