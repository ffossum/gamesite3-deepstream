const Deepstream = require('deepstream.io');
const JwtAuthenticationHandler = require('./src/jwtAuthenticationHandler');
const PermissionHandler = require('./src/permissionHandler');
const { assertEnv, getEnv } = require('./src/environmentUtil');

const config = require('dotenv');
config.load();

const envVariables = [
  'JWT_SECRET',
  'SERVER_USERNAME',
  'SERVER_PASSWORD',
  'DEEPSTREAM_PORT',
];
assertEnv(envVariables);
const [jwtSecret, serverUsername, serverPassword, port] = getEnv(envVariables);

const server = new Deepstream({ port });
server.set(
  'authenticationHandler',
  new JwtAuthenticationHandler(jwtSecret, serverPassword)
);
server.set('permissionHandler', new PermissionHandler(serverUsername));

server.start();
