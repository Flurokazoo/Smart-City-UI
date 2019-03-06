import React, { Component } from 'react';

import './App.css'
import 'bulma/css/bulma.css'
import Landing from './components/Landing';


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Landing title={'Welcome to the Smart Parking UI'} />          
        </header>
      </div>
    );
  }
}

export default App;
