import taskStatusSlice from './taskStatusSlice';

export { getTaskStatuses } from './taskStatusExtra';

export const taskStatusAction = taskStatusSlice.actions;

export * from './taskStatusActions';
export * from './taskStatusHook';

export default taskStatusSlice.reducer;
