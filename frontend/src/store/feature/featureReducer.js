/* eslint-disable import/no-anonymous-default-export */
export const initialState = {
  data: [],
};

export default {
  setFeatureData: (state, action) => {
    state.data = action.payload;
  },

  clearFeatureData: (state) => {
    state.data = initialState.data;
  },
};
