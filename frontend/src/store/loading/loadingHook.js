import { useSelector } from 'react-redux';

import * as selects from './loadingSelect';

export const useLoadingState = () => useSelector(selects.selectLoadingState);
