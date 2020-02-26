import React from 'react';
import ConnectedTable from '../components/ConnectedTable';
import {Provider} from 'react-redux';
import createStore from './storyStore';
import students from '../api/students';
import session from '../api/session';
import actions from '../actions';
import qs from 'querystring';

export default {
  title: 'ConnectedTable',
};

const withStore = setup => () => {
  const store = createStore();
  setup(store);



  return <Provider store={store}>
    <div>
      <ConnectedTable/>
    </div>
  </Provider>
};

export const WithDefaultData = withStore(store => {
  store.dispatch({type: 'SESSION_FETCH_OK', payload: session.data});
  store.dispatch({type: 'STUDENTS_FETCH_OK', payload: students.data});
});

export const WithSearch = withStore(store => {
  store.dispatch({type: 'SESSION_FETCH_OK', payload: session.data});
  store.dispatch({type: 'STUDENTS_FETCH_OK', payload: students.data});
  store.dispatch(actions.onSearchChange('Alex'));
});

export const WithSort = withStore(store => {
  store.dispatch({type: 'SESSION_FETCH_OK', payload: session.data});
  store.dispatch({type: 'STUDENTS_FETCH_OK', payload: students.data});
  store.dispatch(actions.onSort('githubId', 'asc'));
});
