const PermissionHandler = require('./permissionHandler');

describe('permission handler', () => {
  test('gives permission to the server', () => {
    const serverUsername = 'server username';
    const handler = new PermissionHandler(serverUsername);

    const callback = jest.fn();
    handler.canPerformAction(serverUsername, 'message', callback);

    expect(callback).toHaveBeenCalledWith(null, true);
  });

  test('everyone are allowed to subscribe to events', () => {
    const handler = new PermissionHandler();

    const callback = jest.fn();
    handler.canPerformAction(
      'OPEN',
      {
        topic: 'E',
        action: 'S',
      },
      callback
    );

    expect(callback).toHaveBeenCalledWith(null, true);
  });

  describe('emitted event message containing uid', () => {
    const eventData = {
      data: ['', 'O{"uid": "asdf"}'],
      topic: 'E',
      action: 'EVT',
    };
    test('is rejected if socket username does not match uid', () => {
      const handler = new PermissionHandler();

      const callback = jest.fn();
      handler.canPerformAction('OPEN', eventData, callback);

      expect(callback).toHaveBeenCalledWith(null, false);
    });
    test('is allowed if socket username matches uid', () => {
      const handler = new PermissionHandler();

      const callback = jest.fn();
      handler.canPerformAction('asdf', eventData, callback);

      expect(callback).toHaveBeenCalledWith(null, true);
    });
  });

  test('otherwise, message is disallowed', () => {
    const handler = new PermissionHandler();

    const callback = jest.fn();
    handler.canPerformAction('client id', 'message', callback);

    expect(callback).toHaveBeenCalledWith(null, false);
  });
});
