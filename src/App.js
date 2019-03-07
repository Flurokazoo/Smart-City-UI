import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import './App.css'
import 'bulma/css/bulma.css'
import Landing from './components/Landing'


class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={Landing} />         
          <Route component={Notfound} />
        </Switch>    
      </div>
    )
  }
}

export default App;
