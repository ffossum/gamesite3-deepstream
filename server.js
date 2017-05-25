const Deepstream = require('deepstream.io');
const JwtAuthenticationHandler = require('./src/jwtAuthenticationHandler');
const PermissionHandler = require('./src/permissionHandler');

const server = new Deepstream();
server.set('authenticationHandler', new JwtAuthenticationHandler());
server.set('permissionHandler', new PermissionHandler());

server.start();
