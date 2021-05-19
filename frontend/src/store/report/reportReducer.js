/* eslint-disable import/no-anonymous-default-export */
export const initialState = {
  data: [],
  currentMonth: {},
};

export default {
  setReportData: (state, action) => {
    state.data = action.payload;
  },

  setCurrentMonth: (state, action) => {
    state.currentMonth = action.payload;
  },

  clearReportData: (state) => {
    state.data = initialState.data;
    state.currentMonth = initialState.currentMonth;
  },
};
