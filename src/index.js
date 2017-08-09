import React from 'react';
import ReactDOM from 'react-dom';
import { 
  BrowserRouter as Router
} from 'react-router-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

/**
 * Render the application
 * 
 * @param {Component} Component - The root component of your application
 */
const render = Component => {
  ReactDOM.render(
    <Router>
      <Component />
    </Router>
  , document.getElementById('root'));
}

render(App);

// Enable Hot Module Replacement
if (module.hot) {
  module.hot.accept('./App', () => { render(App) })
}


registerServiceWorker();
