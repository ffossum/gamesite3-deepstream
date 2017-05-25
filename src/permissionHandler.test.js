const PermissionHandler = require('./permissionHandler');

describe('permission handler', () => {
  it('gives permission to the server', () => {
    const handler = new PermissionHandler();

    const callback = jest.fn();
    handler.canPerformAction('node server', 'message', callback);

    expect(callback).toHaveBeenCalledWith(null, true);
  });
});
