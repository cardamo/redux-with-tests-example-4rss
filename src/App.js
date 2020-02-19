import React from 'react';
import './App.css';
import VanillaTable from "./components/VanillaTable";

class App extends React.PureComponent {

  render() {
    return (
      <div className="App">
        <VanillaTable/>
      </div>
    );
  }
}

export default App;
