import { createSlice } from '@reduxjs/toolkit';
import reducers, { initialState } from './taskStatusReducer';
import extraReducers from './taskStatusExtra';

const taskStatusSlice = createSlice({
  name: 'taskStatus',
  initialState,
  reducers,
  extraReducers,
});

export default taskStatusSlice;
