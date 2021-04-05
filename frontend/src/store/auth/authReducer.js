export const initialState = {
  data: [],
  dictionaryName: '',
  pagination: {
    page: 0,
    size: 20,
  },
  sort: '',
  totalElements: 0,
  loading: false,
};

export default {
  setDictionaryPagination: (state, action) => {
    state.pagination = {
      ...state.pagination,
      ...action.payload,
    };
  },

  setDictionaryName: (state, action) => {
    state.dictionaryName = action.payload;
  },

  setDictionarySort: (state, action) => {
    state.sort = action.payload;
  },

  clearDictionaryData: (state) => {
    state.data = initialState.data;
    state.pagination = initialState.pagination;
    state.dictionaryName = initialState.dictionaryName;
    state.totalElements = initialState.totalElements;
    state.loading = initialState.loading;
  },
};
