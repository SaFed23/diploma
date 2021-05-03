import { createSlice } from '@reduxjs/toolkit';
import reducers, { initialState } from './inviteReducer';

const inviteSlice = createSlice({
  name: 'invite',
  initialState,
  reducers,
});

export default inviteSlice;
