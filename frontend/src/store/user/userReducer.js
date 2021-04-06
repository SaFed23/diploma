/* eslint-disable import/no-anonymous-default-export */
export const initialState = {
  user: {},
  token: "",
  loading: false,
};

export default {
  setUserData: (state, action) => {
    state.user = {
      ...state.user,
      ...action.payload,
    };
  },

  setUserToken: (state, action) => {
    state.token = action.payload.token;
  },

  clearUserData: (state) => {
    state.user = initialState.user;
    state.loading = initialState.loading;
  },
};
