/* eslint-disable import/no-anonymous-default-export */
export const initialState = {
  user: {},
  language: localStorage.getItem('lng') || "en",
  token: "",
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

  setUserLanguage: (state, action) => {
    state.language = action.payload;
  },

  clearUserData: (state) => {
    state.user = initialState.user;
    state.loading = initialState.loading;
    localStorage.removeItem('token');
  },
};
