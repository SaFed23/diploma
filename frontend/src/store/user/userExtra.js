/* eslint-disable import/no-anonymous-default-export */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { userLogin } from '../../service/user';

// extra actions
export const getUserToken = createAsyncThunk('user/getToken', async (user, thunkAPI) => {
  const { data, status } = await userLogin(user);
  return { data, status }
});

// extra reducer
export default {
  [getUserToken.pending]: (state) => {
    state.loading = true;
  },
  [getUserToken.fulfilled]: (state, action) => {
    const { data, status } = action.payload;
    if (status === 201) {
      state.user = data.user;
      state.token = data.token;
      state.loading = false;
    } else {
      state.loading = false;
    }
  },
  [getUserToken.rejected]: (state) => {
    state.loading = false;
  },
};
