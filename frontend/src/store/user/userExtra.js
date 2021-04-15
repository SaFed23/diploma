/* eslint-disable import/no-anonymous-default-export */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { userLogin } from '../../service/user';
import { snackbarAction } from '../snackbar';

// extra actions
export const getUserToken = createAsyncThunk('user/getToken',
  async (user, { dispatch }) => {
    const { data, status } = await userLogin(user);
    if (status === 201) {
      dispatch(snackbarAction.addNotification({
        message: "login_success",
        variant: "success"
      }));
      localStorage.setItem('token', `bearer ${data.token}`);
      return data;
    }
    dispatch(snackbarAction.addNotification({
      message: "login_fail",
      variant: "error"
    }));
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
