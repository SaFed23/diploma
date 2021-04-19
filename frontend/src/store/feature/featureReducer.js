/* eslint-disable import/no-anonymous-default-export */
export const initialState = {
  data: [],
  projectId: '',
};

export default {
  setFeatureData: (state, action) => {
    state.data = action.payload;
  },

  setProjectId: (state, action) => {
    state.projectId = action.payload;
  },

  clearFeatureData: (state) => {
    state.data = initialState.data;
    state.projectId = initialState.projectId;
  },
};
