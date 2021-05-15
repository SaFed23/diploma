import factorSlice from './factorSlice';

export { createFactor, getFactors, updateFactor } from './factorExtra';

export const factorAction = factorSlice.actions;

export * from './factorActions';
export * from './factorHook';

export default factorSlice.reducer;
