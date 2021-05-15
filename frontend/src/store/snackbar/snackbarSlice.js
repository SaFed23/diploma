import { createSlice } from '@reduxjs/toolkit';
import reducers, { initialState } from './snackbarReducer';

const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers,
});

export default snackbarSlice;