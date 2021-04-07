import { useSelector } from 'react-redux';

import * as selects from './userSelect';

export const useUserState = () => useSelector(selects.selectUserState);
export const useUserData = () => useSelector(selects.selectUserData);
export const useUserToken = () => useSelector(selects.selectUserToken);
export const useUserLanguage = () => useSelector(selects.selectUserLanguage);
