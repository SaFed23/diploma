import { createSlice } from '@reduxjs/toolkit';
import reducers, { initialState } from './authReducer';
import extraReducers from './authExtra';

const dictionarySlice = createSlice({
  name: 'dictionary',
  initialState,
  reducers,
  extraReducers,
});

export default dictionarySlice;
