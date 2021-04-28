import { useSelector } from 'react-redux';

import * as selects from './commentSelect';

export const useCommentState = () => useSelector(selects.selectCommentState);
export const useCommentData = () => useSelector(selects.selectCommentData);
