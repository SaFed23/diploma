import { createSlice } from '@reduxjs/toolkit';
import reducers, { initialState } from './snackbarReducer';

const featureSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers,
});

export default featureSlice;