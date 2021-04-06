import { createSlice } from '@reduxjs/toolkit';
import reducers, { initialState } from './userReducer';
import extraReducers from './userExtra';

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers,
  extraReducers,
});

export default userSlice;
