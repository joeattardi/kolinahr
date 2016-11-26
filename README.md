![](https://raw.githubusercontent.com/joeattardi/kolinahr/master/title.png)

A tool for building Kellogg Logic Models.

# Instructions
To run Kolinahr, you will need:
 * Node.js 6.x or later
 * MongoDB 3.x or later

## OpenID Connect Authentication
Kolinahr uses OpenID Connect for authentication.

## Configuration
All of Kolinahr's core configuration is stored in `conf/config.json`. Here is an example configuration showing all of the available options:

    {
      "port": 3000,
      "logLevel": "info",
      "mongoDbUri": "mongodb://localhost/kolinahr",
      "openIdConnect": {
        "authUrl": "https://accounts.google.com/o/oauth2/v2/auth",
        "tokenUrl": "https://www.googleapis.com/oauth2/v4/token",
        "userInfoUrl": "https://www.googleapis.com/oauth2/v3/userinfo",
        "clientId": "myclientid.apps.googleusercontent.com",
        "clientSecret": "myclientsecret",
        "callbackUrl": "http://localhost:3000/auth/callback"
      },
      "ssl": {
        "port": 3443,
        "key": "/path/to/key",
        "cert": "/path/to/cert",
        "passphrase": "password",
      },
      "jwtSecret": "myjwtsecret"
    }

## Setup
 * Run `npm install` to install all dependencies.
 * Set the `NODE_ENV` environment variable to either `"development"` or `"production"`.
 * Run `npm start` to build the client app and start the server.

# Why "Kolinahr"?
It's a Star Trek reference. Kolinahr is the ritual where Vulcans purge all their emotions, and embrace pure logic. 

# Screenshot
![Screenshot](https://raw.githubusercontent.com/joeattardi/kolinahr/master/screenshot.png)

