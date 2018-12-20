import {
  createStore,
  applyMiddleware
} from 'redux';
import thunk from 'redux-thunk';
import reducer from '../reducers';
import createLogger from 'redux-logger';
import {
  browserHistory
} from 'react-router';
import {
  routerMiddleware
} from 'react-router-redux';

const middleware = routerMiddleware(browserHistory);
const logger = createLogger();
const createStoreWithMiddleware = process.env.NODE_ENV === 'production' ? applyMiddleware(
  middleware, thunk
)(createStore) : applyMiddleware(
  middleware, thunk, logger
)(createStore);
const configureStore = (initialState) => {
  const store = createStoreWithMiddleware(reducer, initialState);
  return store;
};
export default configureStore;