/* eslint-disable import/prefer-default-export */
import { getDictionary } from './authExtra';
import dictionarySlice from './dictionarySlice';

const { setDictionaryPagination, setDictionaryName, setDictionarySort } = dictionarySlice.actions;

export const setDictionaryInfoAndFetch = (pagination, dictionaryName, sort) => async (dispatch) => {
  dispatch(setDictionaryPagination(pagination));
  dispatch(setDictionaryName(dictionaryName));
  dispatch(setDictionarySort(sort));
  dispatch(getDictionary());
};
