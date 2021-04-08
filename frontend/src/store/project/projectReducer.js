/* eslint-disable import/no-anonymous-default-export */
export const initialState = {
  projects: [],
};

export default {
  setProjectData: (state, action) => {
    state.user = action.payload;
  },

  clearUserData: (state) => {
    state.projects = initialState.projects;
  },
};
