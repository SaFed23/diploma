import { configureStore } from '@reduxjs/toolkit';

import * as reducers from './rootReducer';

export default configureStore({
  reducer: { ...reducers },
});
