import featureSlice from './featureSlice';

export { getFeaturesByProjectId } from './featureExtra';

export const featureAction = featureSlice.actions;

export * from './featureActions';
export * from './featureHook';

export default featureSlice.reducer;
