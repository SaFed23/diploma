import featureSlice from './featureSlice';

export {
  getFeaturesByProjectId,
  createFeature,
  updateFeature,
  deleteFeature
} from './featureExtra';

export const featureAction = featureSlice.actions;

export * from './featureActions';
export * from './featureHook';

export default featureSlice.reducer;
