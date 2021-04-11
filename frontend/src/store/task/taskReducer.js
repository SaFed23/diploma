/* eslint-disable import/no-anonymous-default-export */
export const initialState = {
  data: [],
};

export default {
  setTaskData: (state, action) => {
    state.data = action.payload;
  },

  clearTaskData: (state) => {
    state.data = initialState.data;
  },
};
