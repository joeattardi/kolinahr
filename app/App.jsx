import React from 'react';
import logo from './images/logo.png';

export default class App extends React.Component {
  render() {
    return (
      <header>
        <img src={logo} />
        <h1>Kolinahr</h1>
      </header>
    );
  }
}
