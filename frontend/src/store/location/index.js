import locationSlice from './locationSlice';

export { createLocation, getLocations, updateLocation } from './locationExtra';

export const locationAction = locationSlice.actions;

export * from './locationActions';
export * from './locationHook';

export default locationSlice.reducer;
