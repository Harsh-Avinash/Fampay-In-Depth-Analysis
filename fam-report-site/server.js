const protect = require('static-auth');
const safeCompare = require('safe-compare');
const path = require('path');

const app = protect(
  '/thefamreport',
  (_, password) => safeCompare(password, 'myPassword'),
  {
    directory: path.join(__dirname, '/dist'),
    realm: 'Restricted Area',
    onAuthFailed: res => {
      res.statusCode = 401;
      res.end('Restricted area, please enter password.');
    }
  }
);

module.exports = app;
