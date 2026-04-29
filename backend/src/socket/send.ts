import { WebSocket } from "ws";
import { clients } from "./clients.js";

export const send = (ws: WebSocket, data: unknown) => {
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify(data));
  }
}

export const broadcast = (data: unknown) => {
  const msg = JSON.stringify(data);

  for (const client of clients) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(msg);
    }
  }
}