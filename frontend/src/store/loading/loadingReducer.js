/* eslint-disable import/no-anonymous-default-export */
export const initialState = {
  loading: false,
};

export default {
  startLoading: (state) => {
    state.loading = true;
  },

  finishLoading: (state) => {
    state.loading = false;
  }
};
