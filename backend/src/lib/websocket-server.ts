import { Server as HttpServer } from 'http';
import { Socket } from 'net';
import { SocketServer, initSocketIO } from './socket';

class WebSocketServer {
  private static instance: WebSocketServer;
  private io: SocketServer | null = null;
  private httpServer: HttpServer | null = null;

  private constructor() {}

  public static getInstance(): WebSocketServer {
    if (!WebSocketServer.instance) {
      WebSocketServer.instance = new WebSocketServer();
    }
    return WebSocketServer.instance;
  }

  public attachServer(httpServer: HttpServer): void {
    if (!this.io) {
      console.log('[WebSocket] Attaching Socket.IO server to HTTP server');
      this.httpServer = httpServer;
      this.io = initSocketIO(httpServer);
      console.log('[WebSocket] Socket.IO server attached successfully');
    }
  }

  public getIO(): SocketServer | null {
    return this.io;
  }
}

export default WebSocketServer;