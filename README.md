# kolinahr
A tool for building Kellogg Logic Models.

Demo: [http://kolinahr.herokuapp.com](http://kolinahr.herokuapp.com)

# Instructions
To run Kolinahr, you will need:
 * Node.js 6.x or later
 * MongoDB 3.x or later

## OpenID Connect Authentication
Kolinahr uses OpenID Connect for authentication.

## Environment Variables
All of Kolinahr's core configuration is done using environment variables. You will need to set the following variables:
 * `PORT` - The port number for Kolinahr to listen for incoming connections.
 * `MONGODB_URI` - The full URI to the Kolinahr database on your MongoDB server, e.g. `mongodb://localhost/kolinahr`
 * `OPENID_CONNECT_AUTHORIZATION_URL` - The authorization URL endpoint for your OpenID Connect provider.
 * `OPENID_CONNECT_TOKEN_URL` - The token URL endpoint for your OpenID Connect provider.
 * `OPENID_CONNECT_USER_INFO_URL` - The userinfo URL endpoint for your OpenID Connect provider.
 * `OPENID_CONNECT_CLIENT_ID` - The client ID for your OpenID Connect provider.
 * `OPENID_CONNECT_CLIENT_SECRET` - The client secret for your OpenID Connect provider.
 * `OPENID_CONNECT_CALLBACK_URL` - The callback URL to use with your OpenID Connect provider. This should be of the form `http://host:port/auth/callback`, where `host` and `port` are the host and port Kolinahr is running on.
 * `JWT_SECRET` - The secret to use for signing JSON Web Tokens. This can be any random string of your choosing.

## Setup
 * Run `npm install` to install all dependencies.
 * Set your environment variables (see above).
 * Run `npm start` to build the client app and start the server.

# Why "Kolinahr"?
It's a Star Trek reference. Kolinahr is the ritual where Vulcans purge all their emotions, and embrace pure logic. 

# Screenshot
![Screenshot](https://raw.githubusercontent.com/joeattardi/kolinahr/master/screenshot.png)
