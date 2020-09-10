import React from 'react';
import './App.css';
import ConnectedTable from "./components/ConnectedTable";
import { Provider } from 'react-redux'
import store from './store/store'


class App extends React.PureComponent {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <ConnectedTable/>
        </div>
      </Provider>
    );
  }
}

export default App;
