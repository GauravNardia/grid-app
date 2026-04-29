import { WebSocketServer } from "ws";
import { PORT } from "../config/env.js";
import { handleConnection } from "./handlers/connection.js";

export const wss = new WebSocketServer({
  port: PORT,
});

console.log(`WS running on ws://localhost:${PORT}`);

wss.on("connection", handleConnection);