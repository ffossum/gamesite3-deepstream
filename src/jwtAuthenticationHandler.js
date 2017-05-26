const EventEmitter = require('events');
const { parse } = require('cookie');
const { verifyJwt } = require('./jwt');

async function getClientId(jwtSecret, connectionData) {
  const cookies = parse(connectionData.headers.cookie || '');
  try {
    const decoded = await verifyJwt(cookies.jwt, jwtSecret);
    return decoded.id;
  } catch (err) {
    return;
  }
}

class JwtAuthenticationHandler extends EventEmitter {
  constructor(jwtSecret, serverPassword) {
    super();

    this.isValidUser = async (connectionData, authData = {}, callback) => {
      const clientId = authData.password === serverPassword
        ? authData.id
        : await getClientId(connectionData);

      callback(true, { username: clientId });
    };

    this.isReady = true;
    this.emit('ready');
  }
}

module.exports = JwtAuthenticationHandler;
