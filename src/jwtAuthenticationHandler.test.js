const JwtAuthenticationHandler = require('./jwtAuthenticationHandler');

describe('jwt authentication handler', () => {
  test('is ready immediately', () => {
    const handler = new JwtAuthenticationHandler();
    expect(handler.isReady).toBe(true);
  });
});
