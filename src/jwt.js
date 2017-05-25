const jwt = require('jsonwebtoken');

function verifyJwt(token, secret) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
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
