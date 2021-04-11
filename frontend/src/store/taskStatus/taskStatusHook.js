import { useSelector } from 'react-redux';

import * as selects from './taskStatusSelect';

export const useTaskStatusState = () => useSelector(selects.selectTaskStatusState);
export const useTaskStatusData = () => useSelector(selects.selectTaskStatusData);
