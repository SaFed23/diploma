/* eslint-disable import/no-anonymous-default-export */
export const initialState = {
  data: [],
};

export default {
  setTaskStatusData: (state, action) => {
    state.data = action.payload;
  },

  clearTaskStatusData: (state) => {
    state.data = initialState.data;
  },
};
