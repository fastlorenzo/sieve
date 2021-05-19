/*
 * The content of this file is licensed. You may obtain a copy of
 * the license at https://github.com/thsmi/sieve/ or request it via
 * email from the author.
 *
 * Do not remove or change this comment.
 *
 * The initial author of the code is:
 *   Thomas Schmid <schmid-thomas@gmx.net>
 */

import { SieveAbstractClient } from "./SieveAbstractClient.mjs";
import { SieveWebSocketUrl } from "./SieveWebSocketUrl.mjs";

/**
 * Implements a websocket based transport.
 * It message based and thus way simpler than a conventional socket
 * implementation. Authentication, fragmentation and security are abstracted
 * inside the websocket layer.
 */
class SieveWebSocketClient extends SieveAbstractClient {


  /**
   * Creates a new instance
   * @param {SieveLogger} logger
   *   the logger which should be used.
   */
  constructor(logger) {

    super(logger);

    this.socket = null;
  }


  /**
   * WebSockets work like http it is either secure or not
   * but it can not be upgraded later.
   **/
  async startTLS() {
    throw new Error("WebSockets do not support starttls");
  }

  /**
   * @inheritdoc
   */
  connect(url, secure) {

    if (this.socket)
      return this;

    if (typeof url === 'string' || url instanceof String)
      url = new SieveWebSocketUrl(url);

    this.host = url.getHost();
    this.port = url.getPort();
    this.endpoint = url.getEndpoint();

    this.getLogger().logState(`Connecting to ${this.host}:${this.port} ...`);

    this.secure = secure;
    this.secured = false;

    // Create the socket...
    if (this.secure)
      this.socket = new WebSocket(`wss://${this.host}:${this.port}/${this.endpoint}`);
    else
      this.socket = new WebSocket(`ws://${this.host}:${this.port}/${this.endpoint}`);

    // ... connect the event listeners.
    this.socket.addEventListener('open', (ev) => {
      this.onOpen(ev);
    });

    this.socket.addEventListener('message', (ev) => {
      const data = Array.prototype.slice.call(
        new Uint8Array(new TextEncoder("UTF-8").encode(ev.data)));

      this.onReceive(data);
    });

    this.socket.addEventListener('error', async (ev) => {
      if ((this.listener) && (this.listener.onError))
        await this.listener.onError(ev.message);
    });

    this.socket.addEventListener('close', async () => {
      this.disconnect();

      if ((this.listener) && (this.listener.onDisconnect))
        await this.listener.onDisconnect();
    });

    return this;
  }

  /**
   * @inheritdoc
   */
  async disconnect(reason) {

    this.getLogger().logState(`[SieveClient:disconnect] Disconnecting ${this.host}:${this.port}...`);

    await super.disconnect(reason);

    if (!this.socket) {
      this.getLogger().logState(`[SieveClient:disconnect()] ... no valid socket`);
      return;
    }

    this.getLogger().logState(`[SieveClient:disconnect()] ... destroying socket...`);
    this.socket.close();
    this.socket = null;

    if ((this.listener) && (this.listener.onDisconnected))
      await this.listener.onDisconnected();

    this.getLogger().logState("[SieveClient:disconnect()] ... disconnected.");
  }


  /**
   * Called when the websocket connection is open.
   *
   * @param {Event} ev
   *  the event handler with details about the open event.
   */
  onOpen(ev) {
    this.getLogger().logState(`Connected to ${this.host}:${this.port} ...`);

    if (this.secure)
      this.secured = true;
  }


  /**
   * @inheritdoc
   */
  onSend(data) {

    if (this.getLogger().isLevelStream()) {
      // Convert string into an UTF-8 array...
      const output = Array.prototype.slice.call(
        (new TextEncoder()).encode(data));

      this.getLogger().logStream(`Client -> Server [Byte Array]:\n${output}`);
    }

    this.socket.send(data);
  }
}

export { SieveWebSocketClient as Sieve };
