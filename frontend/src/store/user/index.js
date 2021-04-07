import userSlice from '../user/userSlice';

export { getUserToken } from '../user/userExtra';

export const userAction = userSlice.actions;

export * from '../user/userActions';
export * from '../user/userHook';

export default userSlice.reducer;
