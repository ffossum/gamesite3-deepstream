const EventEmitter = require('events');

class PermissionHandler extends EventEmitter {
  constructor() {
    super();
    this.isReady = true;
    this.emit('ready');
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
