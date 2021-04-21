/* eslint-disable import/no-anonymous-default-export */
export const initialState = {
  data: [],
  current: {},
};

export default {
  setProjectData: (state, action) => {
    state.data = action.payload;
  },

  setCurrentProject: (state, action) => {
    state.current = action.payload;
  },

  clearProjectData: (state) => {
    state.data = initialState.data;
  },

  clearCurrentProject: (state) => {
    state.current = initialState.current;
  },
};
