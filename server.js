const Deepstream = require('deepstream.io');
const JwtAuthenticationHandler = require('./src/jwtAuthenticationHandler');
const PermissionHandler = require('./src/permissionHandler');

require('dotenv-safe').load();

const jwtSecret = process.env.JWT_SECRET;
const serverUsername = process.env.SERVER_USERNAME;
const serverPassword = process.env.SERVER_PASSWORD;

const server = new Deepstream('config.yml');
server.set(
  'authenticationHandler',
  new JwtAuthenticationHandler(jwtSecret, serverPassword)
);
server.set('permissionHandler', new PermissionHandler(serverUsername));

server.start();
