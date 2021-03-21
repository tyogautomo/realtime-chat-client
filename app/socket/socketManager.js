import { io } from 'socket.io-client';

class SocketManager {
  constructor() {
    this.socket = null;
    this.listeners = {};
  }

  connect(url) {
    this.socket = io(url);
  }

  reconnect() {
    this.socket.connect();
  }

  static addListener(page, callback) {

  }
}

export { SocketManager };
