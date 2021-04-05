import { useSelector } from 'react-redux';

import * as selects from './authSelect';

export const useDictionaryState = () => useSelector(selects.selectDictionaryState);
export const useDictionaryData = () => useSelector(selects.selectDictionaryData);
export const useDictionaryPagination = () => useSelector(selects.selectDictionaryPagination);
export const useDictionaryName = () => useSelector(selects.selectDictionaryName);
export const useDictionaryLoading = () => useSelector(selects.selectDictionaryLoading);
export const useDictionaryTotalElements = () => useSelector(selects.selectDictionaryTotalElements);
