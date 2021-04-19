import { useSelector } from 'react-redux';

import * as selects from './taskSelect';

export const useTaskState = () => useSelector(selects.selectTaskState);
export const useAllTasks = () => useSelector(selects.selectAllTasks);
export const useCurrentTask = () => useSelector(selects.selectCurrentTask);
