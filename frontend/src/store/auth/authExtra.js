// import { createAsyncThunk } from '@reduxjs/toolkit';
// import { parseResponseData } from '@lib/helpers/api';
// import { dictionaryService } from '@services';

// // extra actions
// export const getDictionary = createAsyncThunk('dictionary/getDictionary', async (_, thunkAPI) => {
//   const { pagination, dictionaryName, sort } = thunkAPI.getState().dictionary;
//   const { data } = await dictionaryService.getDictionaries({ pagination, dictionaryName, sort });
//   return data;
// });

// // extra reducer
// export default {
//   [getDictionary.pending]: (state) => {
//     state.loading = true;
//   },
//   [getDictionary.fulfilled]: (state, action) => {
//     const { data, pagination, totalElements } = parseResponseData(action.payload, state.pagination);
//     state.data = data;
//     state.pagination = pagination;
//     state.totalElements = totalElements;
//     state.loading = false;
//   },
//   [getDictionary.rejected]: (state) => {
//     state.loading = false;
//   },
// };
