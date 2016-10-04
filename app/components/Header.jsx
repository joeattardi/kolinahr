import React from 'react';
import { Link, IndexLink } from 'react-router';

import logo from '../images/logo.png';

export default function Header(props) {
  function renderUser() {
    return (
      <div id="user-info">
        <img alt={props.user.name} src={props.user.picture} width="20" />
        {props.user.name}
      </div>
    );
  }

  function renderLogout() {
    return (
      <Link to="/logout">
        <i className="fa fa-sign-out" />
      </Link>
    );
  }

  function renderLogin() {
    return (
      <Link to="/login">
        Log in <i className="fa fa-sign-in" />
      </Link>
    );
  }

  return (
    <header>
      <IndexLink id="home-link" to="/">
        <img src={logo} width="25" height="25" alt="Kolinahr logo" />
        <h1>Kolinahr</h1>
      </IndexLink>
      {props.user._id ? renderUser() : ''}
      {props.user._id ? renderLogout() : renderLogin()}
    </header>
  );
}

Header.propTypes = {
  user: React.PropTypes.object.isRequired
};
