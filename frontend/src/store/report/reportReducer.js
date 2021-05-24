/* eslint-disable import/no-anonymous-default-export */
export const initialState = {
  data: [],
  adminReport: [],
  currentMonth: {},
};

export default {
  setReportData: (state, action) => {
    state.data = action.payload;
  },

  setCurrentMonth: (state, action) => {
    state.currentMonth = action.payload;
  },

  clearAdminReport: (state, action) => {
    state.adminReport = initialState.adminReport;
  },

  clearReportData: (state) => {
    state.data = initialState.data;
    state.adminReport = initialState.adminReport;
    state.currentMonth = initialState.currentMonth;
  },
};
