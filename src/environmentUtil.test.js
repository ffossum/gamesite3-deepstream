const { assertEnv, getEnv } = require('./environmentUtil');

describe('environment utility', () => {
  beforeEach(() => {
    delete process.env.UNSET;
    process.env.SET = 'set';
    process.env.ANOTHER_SET = 'another';
  });

  describe('assertEnv', () => {
    test('throws error if env variable is unset', () => {
      expect(() => assertEnv(['UNSET'])).toThrow();
    });

    test('does not throw if variable is set', () => {
      expect(() => assertEnv(['SET'])).not.toThrow();
    });

    test('throws error if any variable is unset', () => {
      expect(() => assertEnv(['SET', 'ANOTHER_SET', 'UNSET'])).toThrow();
    });
  });

  describe('getEnv', () => {
    test('gets value of environment variables', () => {
      const [set, anotherSet] = getEnv(['SET', 'ANOTHERSET']);
    });
  });
});
