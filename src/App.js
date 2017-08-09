import React, { Component } from 'react';
import universal from 'react-universal-component';
import {
  Route,
  Link
} from 'react-router-dom';
import asyncComponent from './lib/asyncComponent';
import logo from './logo.svg';
import './App.css';

// Load the async component and set the chunk's name to webpack
// const Lazy = asyncComponent(() => import(/* webpackChunkName: "lazy" */'./Lazy'));

const Lazy = universal(props => import(/* webpackChunkName: "lazy" */'./Lazy'));

class App extends Component {
  render() {
    return (
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
    );
  }
}

export default App;
