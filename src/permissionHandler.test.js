const PermissionHandler = require('./permissionHandler');

describe('permission handler', () => {
  it('gives permission to the server', () => {
    const serverUsername = 'server username';
    const handler = new PermissionHandler(serverUsername);

    const callback = jest.fn();
    handler.canPerformAction(serverUsername, 'message', callback);

    expect(callback).toHaveBeenCalledWith(null, true);
  });

  it('clients are not allowed to perform actions, ...for now', () => {
    const handler = new PermissionHandler();

    const callback = jest.fn();
    handler.canPerformAction('client id', 'message', callback);

    expect(callback).toHaveBeenCalledWith(null, false);
  });
});
