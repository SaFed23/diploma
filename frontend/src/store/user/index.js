import userSlice from '../user/userSlice';

export { getUserToken, updateUser, changePassword } from '../user/userExtra';

export const userAction = userSlice.actions;

export * from '../user/userActions';
export * from '../user/userHook';

export default userSlice.reducer;
