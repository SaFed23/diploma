import { useSelector } from 'react-redux';

import * as selects from './reportSelect';

export const useReportState = () => useSelector(selects.selectReportState);
export const useReportData = () => useSelector(selects.selectReportData);
export const useCurrentMonth = () => useSelector(selects.selectCurrentMonth);
