const Deepstream = require('deepstream.io');
const JwtAuthenticationHandler = require('./src/jwtAuthenticationHandler');
const PermissionHandler = require('./src/permissionHandler');

require('dotenv-safe').load();

const jwtSecret = process.env.JWT_SECRET;
const serverUsername = process.env.SERVER_USERNAME;
const serverPassword = process.env.SERVER_PASSWORD;
const deepstreamPort = process.env.DEEPSTREAM_PORT;

const server = new Deepstream({ port: deepstreamPort });
server.set(
  'authenticationHandler',
  new JwtAuthenticationHandler(jwtSecret, serverPassword)
);
server.set('permissionHandler', new PermissionHandler(serverUsername));

server.start();
