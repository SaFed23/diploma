/* eslint-disable import/no-anonymous-default-export */
export const initialState = {
  data: [],
};

export default {
  setProjectData: (state, action) => {
    state.data = action.payload;
  },

  clearProjectData: (state) => {
    state.data = initialState.data;
  },
};