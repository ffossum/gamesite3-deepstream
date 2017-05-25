const { verifyJwt } = require('./jwt');

describe('jwt', () => {
  test('decodes valid token', () => {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ';
    const secret = 'secret';
    return verifyJwt(token, secret).then(decoded =>
      expect(decoded.name).toBe('John Doe')
    );
  });
});
