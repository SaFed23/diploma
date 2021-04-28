/* eslint-disable import/no-anonymous-default-export */
export const initialState = {
  data: [],
  taskId: '',
};

export default {
  setCommentData: (state, action) => {
    state.data = action.payload;
  },

  setTaskId: (state, action) => {
    state.taskId = action.payload;
  },

  clearCommentData: (state) => {
    state.data = initialState.data;
    state.taskId = initialState.taskId;
  },
};
