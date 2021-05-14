import { useSelector } from 'react-redux';

import * as selects from './loсationSelect';

export const useLocationState = () => useSelector(selects.selectLocationState);
export const useLocationData = () => useSelector(selects.selectLocationData);
