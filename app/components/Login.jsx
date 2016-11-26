import React from 'react';

export default function Login() {
  return (
    <div id="login-container">
      <img src="logo.png" height="50" alt="Logo" />
      <a id="login-button" href="/auth">
        <i className="fa fa-2x fa-openid" /> Log in with OpenID Connect
      </a>
    </div>
  );
}
