import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import './App.css'
import 'bulma/css/bulma.css'
import Landing from './components/Landing/Landing'
import Notfound from './components/Notfound'
import Sectors from './components/Sectors'
import Singlesector from './components/Singlesector'
import History from './components/History'
import Grid from './components/Grid'
import Distance from './components/Distance'



class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/sectors" component={Sectors} />
          <Route path="/single" component={Singlesector} />
          <Route path="/history" component={History} />
          <Route path="/grid" component={Grid} />
          <Route path="/distance" component={Distance} />

          <Route component={Notfound} />
        </Switch>    
      </div>
    )
  }
}

export default App;
