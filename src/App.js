import React, { Component } from 'react';

import './App.css'
import 'bootstrap/dist/css/bootstrap.css';

import Landing from './components/Landing';
import Maps from './components/Maps';



class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Landing title={'Welcome to the Smart Parking UI'} />
          <Maps />
        </header>
      </div>
    );
  }
}

export default App;
