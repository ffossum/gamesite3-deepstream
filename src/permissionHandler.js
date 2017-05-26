const EventEmitter = require('events');

class PermissionHandler extends EventEmitter {
  constructor(serverUsername) {
    super();

    this.canPerformAction = (username, message, callback) => {
      if (username === serverUsername) {
        callback(null, true);
      } else {
        callback(null, false);
      }
    };

    this.isReady = true;
  }
}

module.exports = PermissionHandler;
