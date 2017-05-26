const assert = require('assert');

function assertEnv(requiredVariables) {
  const unsetVariables = requiredVariables.filter(name => !process.env[name]);

  if (unsetVariables.length) {
    throw new Error(
      `Missing environment variable(s): ${unsetVariables.join(', ')}`
    );
  }
}

function getEnv(variables) {
  return variables.map(name => process.env[name]);
}

module.exports = {
  assertEnv,
  getEnv,
};
