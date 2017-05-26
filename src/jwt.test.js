const { verifyJwt } = require('./jwt');

describe('jwt', () => {
  test('decodes valid token', async () => {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ';
    const secret = 'secret';

    const decoded = await verifyJwt(token, secret);
    expect(decoded.name).toBe('John Doe');
  });

  test('rejects invalid token', () => {
    const token =
      'ayJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ';
    const secret = 'secret';

    expect(verifyJwt(token, secret)).rejects.toMatchObject({
      message: 'invalid token',
    });
  });

  test('rejects invalid secret', () => {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ';
    const secret = 'hunter2';

    expect(verifyJwt(token, secret)).rejects.toMatchObject({
      message: 'invalid signature',
    });
  });
});
