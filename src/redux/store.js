import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import RootSagas from './root-sagas';
import RootReducer from './root-reducer';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import { DO_NOT_LOG_ACTIONS } from '../utils/r-logger-helpers';

export const history = createBrowserHistory();

const logger = createLogger({
  // predicate: (getState, action) => !DO_NOT_LOG_ACTIONS.some(a => a === action.type)
});

const sagaMiddleware = createSagaMiddleware();
const middlewares = [ logger, sagaMiddleware, routerMiddleware(history) ];

const store = createStore(
  RootReducer(history),
  applyMiddleware(...middlewares)
);

sagaMiddleware.run(RootSagas);

export default store;