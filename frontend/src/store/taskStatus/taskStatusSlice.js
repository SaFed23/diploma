import { createSlice } from '@reduxjs/toolkit';
import reducers, { initialState } from './taskStatusReducer';
import extraReducers from './taskStatusExtra';

const projectSlice = createSlice({
  name: 'taskStatus',
  initialState,
  reducers,
  extraReducers,
});

export default projectSlice;
