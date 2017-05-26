const JwtAuthenticationHandler = require('./jwtAuthenticationHandler');
const { signJwt } = require('./jwt');

describe('jwt authentication handler', () => {
  test('is ready immediately', () => {
    const handler = new JwtAuthenticationHandler();
    expect(handler.isReady).toBe(true);
  });

  test('allows server with correct server password', () => {
    const jwtSecret = null;
    const serverPassword = 'server password';
    const serverUsername = 'server username';

    const handler = new JwtAuthenticationHandler(jwtSecret, serverPassword);
    const connectionData = {};
    const authData = {
      username: serverUsername,
      password: serverPassword,
    };
    const callback = jest.fn();

    handler.isValidUser(connectionData, authData, callback);

    expect(callback).toHaveBeenCalledWith(true, { username: serverUsername });
  });

  test('rejects server with incorrect correct server password', async () => {
    const jwtSecret = null;
    const serverPassword = 'server password';
    const serverUsername = 'server username';

    const handler = new JwtAuthenticationHandler(jwtSecret, serverPassword);
    const connectionData = {};
    const authData = {
      username: serverUsername,
      password: 'wrong password',
    };
    const callback = jest.fn();

    await handler.isValidUser(connectionData, authData, callback);

    expect(callback).toHaveBeenCalledWith(false, { username: serverUsername });
  });

  test('authenticates client with valid jwt cookie', async () => {
    const jwtSecret = 'secret';
    const serverPassword = null;
    const clientId = 'client id';
    const token = await signJwt({ id: clientId }, jwtSecret);
    const connectionData = {
      headers: {
        cookie: `jwt=${token}`,
      },
    };
    const authData = {};

    const handler = new JwtAuthenticationHandler(jwtSecret, serverPassword);
    const callback = jest.fn();

    await handler.isValidUser(connectionData, authData, callback);

    expect(callback).toHaveBeenCalledWith(true, { username: clientId });
  });

  test('client without valid jwt cookie is allowed, but unauthenticated', async () => {
    const jwtSecret = 'secret';
    const serverPassword = null;
    const clientId = 'client id';
    const token = await signJwt({ id: clientId }, 'wrong secret');
    const connectionData = {
      headers: {
        cookie: `jwt=${token}`,
      },
    };
    const authData = {};

    const handler = new JwtAuthenticationHandler(jwtSecret, serverPassword);
    const callback = jest.fn();

    await handler.isValidUser(connectionData, authData, callback);

    expect(callback).toHaveBeenCalledWith(true, { username: undefined });
  });
});
