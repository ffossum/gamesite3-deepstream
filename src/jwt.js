const jwt = require('jsonwebtoken');
const { jwtSecret } = require('./env');

function verifyJwt(token) {
  return new Promise((resolve, reject) => {
    jwt.verifyAsync(token, jwtSecret, (err, decoded) => {
      if (err) {
        reject(err);
      }

      resolve(decoded);
    });
  });
}

module.exports = {
  verifyJwt,
};
