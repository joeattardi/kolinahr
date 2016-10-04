import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import { deauthUser, hideNotification } from '../actions';

class Logout extends React.Component {
  componentDidMount() {
    localStorage.removeItem('token');
    browserHistory.push('/');
    this.props.deauthUser();
    this.props.hideNotification();
  }

  render() {
    return <div>Logged Out</div>;
  }
}

Logout.propTypes = {
  deauthUser: React.PropTypes.func.isRequired,
  hideNotification: React.PropTypes.func.isRequired
};

export default connect(null, { deauthUser, hideNotification })(Logout);
