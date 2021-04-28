import commentSlice from './commentSlice';

export {
  getCommentsByTaskId
} from './commentExtra';

export const commentAction = commentSlice.actions;

export * from './commentActions';
export * from './commentHook';

export default commentSlice.reducer;
