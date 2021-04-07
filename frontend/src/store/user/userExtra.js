/* eslint-disable import/no-anonymous-default-export */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { userLogin } from '../../service/user';

// extra actions
export const getUserToken = createAsyncThunk('user/getToken',
  async ({ user, notification }) => {
    const { data, status } = await userLogin(user);
    if (status === 201) {
      notification("Login success", { variant: "success" });
      return data;
    }
    notification("Login fail", { variant: "error" });
    return null
  });

// extra reducer
export default {
  [getUserToken.fulfilled]: (state, action) => {
    const data = action.payload;
    if (data) {
      state.user = data.user;
      state.token = data.token;
      state.loading = false;
    }
  },
};
