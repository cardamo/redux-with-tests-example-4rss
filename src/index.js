import React from 'react';
import ReactDOM from 'react-dom';
import ReduxApp from './ReduxApp';
import App from './App';
import {state} from './api/dataApi';

// pretend to pass login screen
state.authenticated = true;

ReactDOM.render(<div>
  <div className='split left'><App/></div>
  <div className='split right'><ReduxApp/></div>
</div>, document.getElementById('root'));

