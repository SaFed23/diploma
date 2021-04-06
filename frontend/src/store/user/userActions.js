/* eslint-disable import/prefer-default-export */
import userSlice from './userSlice';

const { setUserData, setUserToken } = userSlice.actions;

// export const setUserDataAndToken = (body) => async (dispatch) => {
//   dispatch(setDictionaryPagination(pagination));
//   dispatch(setDictionaryName(dictionaryName));
//   dispatch(setDictionarySort(sort));
//   dispatch(getDictionary());
// };
