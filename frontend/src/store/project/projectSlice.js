import { createSlice } from '@reduxjs/toolkit';
import reducers, { initialState } from './projectReducer';
import extraReducers from './projectExtra';

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers,
  extraReducers,
});

export default projectSlice;
