import React from 'react';
import { IndexLink } from 'react-router';

import logo from '../images/logo.png';

export default function Header() {
  return (
    <header>
      <IndexLink to="/">
        <img src={logo} width="25" height="25" alt="Kolinahr logo" />
        <h1>Kolinahr</h1>
      </IndexLink>
    </header>
  );
}
