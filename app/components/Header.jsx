import React from 'react';
import { Link, IndexLink } from 'react-router';

import logo from '../images/logo.png';

export default function Header(props) {
  return (
    <header>
      <IndexLink id="home-link" to="/">
        <img src={logo} width="25" height="25" alt="Kolinahr logo" />
        <h1>Kolinahr</h1>
      </IndexLink>
      <div id="user-info">
        <img alt={props.user.name} src={props.user.avatarUrl} width="20" />
        {props.user.name}
      </div>
      <Link to="/logout">
        <i className="fa fa-sign-out" />
      </Link>
    </header>
  );
}

Header.propTypes = {
  user: React.PropTypes.object.isRequired
};
