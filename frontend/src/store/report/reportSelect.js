import { createSelector } from '@reduxjs/toolkit';

export const selectReportState = (state) => state.report;

export const selectReportData = createSelector(selectReportState, (state) => state.data);
export const selectAdminReport = createSelector(selectReportState, (state) => state.adminReport);
export const selectCurrentMonth = createSelector(selectReportState, (state) => state.currentMonth);