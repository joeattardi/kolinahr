import React from 'react';
import { browserHistory } from 'react-router';

export default class Logout extends React.Component {
  componentDidMount() {
    localStorage.removeItem('token');
    browserHistory.push('/login');
  }

  render() {
    return <div>Logged Out</div>;
  }
}

