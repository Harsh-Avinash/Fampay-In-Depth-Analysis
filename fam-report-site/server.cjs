const protect = require('static-auth');  
const safeCompare = require('safe-compare');

const app = protect(
  '/admin',  // You can change this to '/' to protect the whole site.
  (username, password) => username === '' && safeCompare(password, 'harshavinash'),
  {
    directory: __dirname + '/dist',  // Assuming your built files are in the 'dist' directory.
    realm: 'thefamreport.harshavinash.in',
    onAuthFailed: res => {
      res.end('Restricted area, please login with the password.');
    }
  }
);

module.exports = app;
