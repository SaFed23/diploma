import taskSlice from './taskSlice';

export { getTasksByFeatureId } from './taskExtra';

export const taskAction = taskSlice.actions;

export * from './taskActions';
export * from './taskHook';

export default taskSlice.reducer;
