import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home';
import Fav from './components/Fav';
import Header from './components/Header';

export class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Header/>
          <Switch>
            <Route exact path='/'>
              <Home/>
            </Route>
            <Route exact path='/favorite'>
              <Fav/>
            </Route>
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App;
