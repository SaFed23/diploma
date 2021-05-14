import taskStatusSlice from './taskStatusSlice';

export { getTaskStatuses, createTaskStatus, updateTaskStatus, deleteTaskStatus } from './taskStatusExtra';

export const taskStatusAction = taskStatusSlice.actions;

export * from './taskStatusActions';
export * from './taskStatusHook';

export default taskStatusSlice.reducer;
