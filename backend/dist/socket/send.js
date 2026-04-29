import { WebSocket } from "ws";
import { clients } from "./clients.js";
export const send = (ws, data) => {
    if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify(data));
    }
};
export const broadcast = (data) => {
    const msg = JSON.stringify(data);
    for (const client of clients) {
        if (client.readyState === WebSocket.OPEN) {
            client.send(msg);
        }
    }
};
//# sourceMappingURL=send.js.map