import {combineReducers, compose, createStore} from 'redux';
import reducers from '../reducers';

export default function () {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  return createStore(combineReducers(reducers), composeEnhancers());
}