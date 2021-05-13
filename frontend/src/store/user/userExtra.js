/* eslint-disable import/no-anonymous-default-export */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { SET_AUTH } from '../../service/config';
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
      SET_AUTH(localStorage.getItem('token'));
      return data;
    }
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
