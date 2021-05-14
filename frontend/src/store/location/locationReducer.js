/* eslint-disable import/no-anonymous-default-export */
export const initialState = {
  data: [],
};

export default {
  setLocationData: (state, action) => {
    state.data = action.payload;
  },

  clearLocationData: (state) => {
    state.data = initialState.data;
  },
};
