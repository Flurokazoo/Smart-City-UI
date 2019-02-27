import React, { Component } from 'react';
import Landing from './components/Landing';
import Maps from './components/Maps';

import './App.css'
import 'bootstrap/dist/css/bootstrap.css';


class App extends Component {
  render() {
    return (
      <div className="App">
        <div class="container">
          <header className="App-header">
            <Landing title={'Welcome to the Smart Parking UI'} />
            <Maps />
          </header>
        </div>
      </div>
    );
  }
}

export default App;
