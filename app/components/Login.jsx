import React from 'react';

export default class Login extends React.Component {
  render() {
    return (
      <div id="login-container">
        <h1><img src="logo.png" width="50" height="50" alt="Logo" />Kolinahr</h1>
        <a id="login-button" href="/auth">
          <i className="fa fa-2x fa-openid" /> Log in with OpenID Connect
        </a>
      </div>
    );
  }
}
