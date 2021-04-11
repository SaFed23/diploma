import { useSelector } from 'react-redux';

import * as selects from './featureSelect';

export const useFeatureState = () => useSelector(selects.selectFeatureState);
export const useFeatureData = () => useSelector(selects.selectFeatureData);
