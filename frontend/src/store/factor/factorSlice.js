import { createSlice } from '@reduxjs/toolkit';
import reducers, { initialState } from './factorReducer';
import extraReducers from './factorExtra';

const factorSlice = createSlice({
  name: 'factor',
  initialState,
  reducers,
  extraReducers,
});

export default factorSlice;
