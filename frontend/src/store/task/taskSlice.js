import { createSlice } from '@reduxjs/toolkit';
import reducers, { initialState } from './taskReducer';
import extraReducers from './taskExtra';

const projectSlice = createSlice({
  name: 'task',
  initialState,
  reducers,
  extraReducers,
});

export default projectSlice;
