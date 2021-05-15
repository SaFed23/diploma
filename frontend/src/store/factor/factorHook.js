import { useSelector } from 'react-redux';

import * as selects from './factorSelect';

export const useFactorState = () => useSelector(selects.selectFactorState);
export const useFactorData = () => useSelector(selects.selectFactorData);
