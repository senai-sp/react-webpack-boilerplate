import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import Lazy from './Lazy';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
          </div>
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>

          <Route exact path="/" render={() => (
            <Link to="/lazy">
              Load Lazy component
            </Link>
          )} />
          <Route path="/lazy" component={Lazy} />
        </div>
      </Router>
    );
  }
}

export default App;
