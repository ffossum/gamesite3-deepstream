const EventEmitter = require('events');

class PermissionHandler extends EventEmitter {
  constructor() {
    super();
    this.isReady = true;
  }
  canPerformAction(socketUserId, message, callback) {
    if (socketUserId === 'node server') {
      callback(null, true);
    } else {
      callback(null, false);
    }
  }
}

module.exports = PermissionHandler;
