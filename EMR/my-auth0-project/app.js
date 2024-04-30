const express = require('express');
const { auth } = require('express-openid-connect');

const app = express();

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: 'a long, randomly-generated string stored in env',
  baseURL: 'http://localhost:3000',
  clientID: 'JDGZ7V5Z9vPaww73i2yOyztwufKtEBsf',
  issuerBaseURL: 'https://dev-e6ntthpm58nmskn3.us.auth0.com'
};

app.use(auth(config));

app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
