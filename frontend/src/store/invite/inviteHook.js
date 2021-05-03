import { useSelector } from 'react-redux';

import * as selects from './inviteSelect';

export const useInviteState = () => useSelector(selects.selectInviteState);
export const useInviteData = () => useSelector(selects.selectInviteData);
