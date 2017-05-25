const EventEmitter = require('events');

class PermissionHandler extends EventEmitter {
  constructor() {
    super();
    this.isReady = true;
    this.emit('ready');
  }
  canPerformAction(socketUserId, message, callback) {
    if (socketUserId === 'node server') {
      console.log('yeah i have permission');
      callback(null, true);
    } else {
      console.log('oh no i dont have permission');
      callback(null, false);
    }
  }
}

module.exports = PermissionHandler;