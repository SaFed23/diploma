import { useSelector } from 'react-redux';

import * as selects from './taskSelect';

export const useTaskState = () => useSelector(selects.selectTaskState);
export const useTaskData = () => useSelector(selects.selectTaskData);
