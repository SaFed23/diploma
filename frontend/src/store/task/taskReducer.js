/* eslint-disable import/no-anonymous-default-export */
export const initialState = {
  all: [],
  current: {},
  featureId: '',
};

export default {
  setTaskData: (state, action) => {
    state.all = action.payload;
  },

  setCurrentTask: (state, action) => {
    state.current = { ...action.payload };
  },

  setFeatureId: (state, action) => {
    state.featureId = action.payload;
  },

  clearTaskData: (state) => {
    state.all = initialState.all;
    state.current = initialState.current;
    state.featureId = initialState.featureId;
  },

  clearAllTasks: (state) => {
    state.all = initialState.all;
  },

  clearCurrentTask: (state) => {
    state.current = initialState.current;
  }
};
