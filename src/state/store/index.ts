import { configureStore, MiddlewareArray } from '@reduxjs/toolkit';
import { createLogicMiddleware } from 'redux-logic';

import { httpClient } from '@/api/index';
import conceptsOperations from '@/state/concepts/operationsRoot';

import rootReducer from './reducer';

const operations = [...conceptsOperations];
const logicDeps = {
  httpClient,
};
const logicMiddleware = createLogicMiddleware(operations, logicDeps);

const store = Object.assign(
  configureStore({
    reducer: rootReducer,
    middleware: new MiddlewareArray().concat(logicMiddleware),
  }),
  {
    logicMiddleware,
    httpClient: logicDeps.httpClient,
  },
);

export default store;
