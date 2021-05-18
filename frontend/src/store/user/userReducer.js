/* eslint-disable import/no-anonymous-default-export */
export const initialState = {
  user: {},
  language: localStorage.getItem('lng') || "en",
  allUsers: [],
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

  setAllUsers: (state, action) => {
    state.allUsers = action.payload;
  },

  clearUserData: (state) => {
    state.user = initialState.user;
    state.token = initialState.token;
    state.allUsers = initialState.allUsers;
    localStorage.removeItem('token');
  },
};
