import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { logger } from 'redux-logger';
import RootSagas from './root-sagas';
import RootReducer from './root-reducer';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';

export const history = createBrowserHistory();

const sagaMiddleware = createSagaMiddleware();
const middlewares = [ logger, sagaMiddleware, routerMiddleware(history) ];

const store = createStore(
  RootReducer(history),
  applyMiddleware(...middlewares)
);

sagaMiddleware.run(RootSagas);

export default store;