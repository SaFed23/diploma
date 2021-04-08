import { useSelector } from 'react-redux';

import * as selects from './projectSelect';

export const useProjectState = () => useSelector(selects.selectProjectState);
export const useProjectData = () => useSelector(selects.selectProjectData);
