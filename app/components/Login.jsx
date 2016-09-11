import React from 'react';

export default class Login extends React.Component {
  render() {
    return (
      <div id="login-container">
        <h1><img src="logo.png" width="50" height="50" alt="Logo" />Kolinahr</h1>
        <a id="login-button" href="/auth/github">
          <i className="fa fa-2x fa-github" /> Log in with GitHub
        </a>
      </div>
    );
  }
}
