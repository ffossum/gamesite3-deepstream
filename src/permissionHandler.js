const Deepstream = require('deepstream.io');
const EventEmitter = require('events');

class PermissionHandler extends EventEmitter {
  constructor(serverUsername) {
    super();

    this.canPerformAction = (username, message, callback) => {
      if (username === serverUsername) {
        return callback(null, true);
      }

      if (message.topic === 'E' && message.action === 'S') {
        return callback(null, true);
      }

      if (message.topic === 'E' && message.action === 'EVT') {
        const payload = Deepstream.prototype.convertTyped(message.data[1]);
        if (payload.uid) {
          return callback(null, username === payload.uid);
        }
      }

      if (message.topic === 'P' && message.action === 'REQ') {
        // Allow all rpc requests for now
        return callback(null, true);
      }

      callback(null, false);
    };

    this.isReady = true;
  }
}

module.exports = PermissionHandler;
