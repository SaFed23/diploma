import { createSlice } from '@reduxjs/toolkit';
import reducers, { initialState } from './featureReducer';
import extraReducers from './featureExtra';

const featureSlice = createSlice({
  name: 'feature',
  initialState,
  reducers,
  extraReducers,
});

export default featureSlice;
