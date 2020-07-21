import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { logger } from 'redux-logger';
import RootSagas from './root-sagas';
import RootReducer from './root-reducer';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [ logger, sagaMiddleware ];

const store = createStore(
  RootReducer,
  applyMiddleware(...middlewares)
);

sagaMiddleware.run(RootSagas);

export default store;