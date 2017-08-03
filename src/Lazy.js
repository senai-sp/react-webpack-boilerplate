import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Lazy extends Component {
  render() {
    return (
      <div>
        <h1>Lazy loaded component</h1>
        <h5>Or at least should be</h5>

        <Link to="/">
          Return to /
        </Link>
      </div>
    );
  }
}