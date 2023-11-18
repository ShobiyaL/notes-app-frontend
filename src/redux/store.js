//Initiating the redux store here
import { configureStore, combineReducers } from '@reduxjs/toolkit';

import user from './slices/user';
import notes from './slices/notes';

const reducer = combineReducers({
  user,
  notes,
});

export const store = configureStore({
  reducer,
});
