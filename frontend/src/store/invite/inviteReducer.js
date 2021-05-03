/* eslint-disable import/no-anonymous-default-export */
export const initialState = {
  data: [],
};

export default {
  setInviteData: (state, action) => {
    state.data = action.payload;
  },

  clearInviteState: (state) => {
    state.data = initialState.data;
  },
};
