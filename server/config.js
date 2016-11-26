module.exports = {
  logLevel: 'info',
  mongoDbUri: 'mongodb://localhost/kolinahr',
  openIdConnect: {
    authUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
    tokenUrl: 'https://www.googleapis.com/oauth2/v4/token',
    userInfoUrl: 'https://www.googleapis.com/oauth2/v3/userinfo',
    clientId: '390530064938-e9o679agrpasbeicr13khgkams0i4ako.apps.googleusercontent.com',
    clientSecret: 'QkkSaVxVjFWXalWaqgBZxfZ2',
    callbackUrl: 'http://localhost:3000/auth/callback'
  },
  jwtSecret: 'sad8)(*SaSD987AS(D97ASdacxb'
};
