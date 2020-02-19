import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga'
import reducer from './reducers'
import sagas from './sagas';

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const regularStore = createStore(combineReducers(reducer), composeEnhancers(applyMiddleware(thunk, sagaMiddleware)));

sagaMiddleware.run(sagas);

export default regularStore;
