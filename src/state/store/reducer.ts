import { combineReducers } from '@reduxjs/toolkit';

import * as conceptsReducers from '@/state/concepts';

import dataReducer from '../data';

const rootReducer = combineReducers({
  ...conceptsReducers,
  data: dataReducer,
});

export default rootReducer;
