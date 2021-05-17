/* eslint-disable import/no-anonymous-default-export */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { SET_AUTH } from '../../service/config';
import * as service from '../../service/user';
import { snackbarAction } from '../snackbar';

// extra actions
export const getUserToken = createAsyncThunk('user/getToken',
  async (user, { dispatch }) => {
    const { data, status } = await service.userLogin(user);
    if (status === 201) {
      dispatch(snackbarAction.addNotification({
        message: "login_success",
        variant: "success"
      }));
      localStorage.setItem('token', `bearer ${data.token}`);
      SET_AUTH(localStorage.getItem('token'));
      return data;
    } else {
      dispatch(snackbarAction.addNotification({
        message: "login_fail",
        variant: "error"
      }));
    }
    return null
  }
);

export const updateUser = createAsyncThunk('user/updateUser',
  async (user, { dispatch }) => {
    const { data, status } = await service.updateUser(user);
    if (status === 201) {
      dispatch(snackbarAction.addNotification({
        message: "success",
        variant: "success"
      }));
      return data;
    } else {
      dispatch(snackbarAction.addNotification({
        message: "error",
        variant: "error"
      }));
      return null
    }
  }
);

export const changePassword = createAsyncThunk('user/changePassword',
  async (user, { dispatch }) => {
    try {
      const { data } = await service.changePassword(user);
      dispatch(snackbarAction.addNotification({
        message: "success",
        variant: "success"
      }));
      return data;
    } catch (e) {
      dispatch(snackbarAction.addNotification({
        message: "error",
        variant: "error"
      }));
      return null
    }
  }
);

// extra reducer
export default {
  [getUserToken.fulfilled]: (state, action) => {
    const data = action.payload;
    if (data) {
      state.user = data.user;
      state.token = data.token;
    }
  },
  [updateUser.fulfilled]: (state, action) => {
    const data = action.payload;
    if (data) {
      state.user = data;
    }
  },
};
