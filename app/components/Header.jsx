import React from 'react';

import logo from '../images/logo.png';

export default function Header(props) {
  return (
    <header>
      <img src={logo} width="40" height="40" />
      <h1>Kolinahr</h1>
    </header>
  );
}
