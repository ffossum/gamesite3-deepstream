const EventEmitter = require('events');
const { parse } = require('cookie');
const { verifyJwt } = require('./jwt');
const { jwtSecret, serverPassword } = require('./env');

async function getClientId(connectionData) {
  const cookies = parse(connectionData.headers.cookie || '');
  try {
    const decoded = await verifyJwt(cookies.jwt, jwtSecret);
    return decoded.id;
  } catch (err) {
    return;
  }
}

class JwtAuthenticationHandler extends EventEmitter {
  constructor() {
    super();
    this.isReady = true;
    this.emit('ready');
  }
  async isValidUser(connectionData, authData = {}, callback) {
    const clientId = authData.password === serverPassword
      ? authData.id
      : await getClientId(connectionData);

    callback(true, { username: clientId });
  }
}

module.exports = JwtAuthenticationHandler;
