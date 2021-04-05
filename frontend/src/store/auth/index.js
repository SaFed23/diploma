import dictionarySlice from './dictionarySlice';

export { getDictionary } from './authExtra';

export const { setDictionaryPagination, clearDictionaryData } = dictionarySlice.actions;

export * from './authActions';
export * from './authHook';

export default dictionarySlice.reducer;
