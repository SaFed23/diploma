/* eslint-disable import/no-anonymous-default-export */
export const initialState = {
  data: [],
};

export default {
  setFactorData: (state, action) => {
    state.data = action.payload;
  },

  clearFactorData: (state) => {
    state.data = initialState.data;
  },
};
