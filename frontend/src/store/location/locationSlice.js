import { createSlice } from '@reduxjs/toolkit';
import reducers, { initialState } from './locationReducer';
import extraReducers from './locationExtra';

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers,
  extraReducers,
});

export default locationSlice;
