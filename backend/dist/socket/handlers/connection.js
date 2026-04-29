import { WebSocket } from "ws";
import { clients } from "../clients.js";
import { handleMessage } from "./message.js";
import { loadInitialData } from "../../services/tile.service.js";
import { broadcast } from "../send.js";
function updatePresence() {
    const online = [...clients].filter((client) => client.readyState === WebSocket.OPEN).length;
    broadcast({
        type: "presence",
        count: online,
    });
}
export const handleConnection = async (ws) => {
    clients.add(ws);
    console.log("Client connected");
    updatePresence();
    try {
        await loadInitialData(ws);
    }
    catch (error) {
        console.log(error);
    }
    ws.on("message", (raw) => handleMessage(ws, raw));
    ws.on("close", () => {
        clients.delete(ws);
        updatePresence();
        console.log("Disconnected");
    });
    ws.on("error", () => {
        clients.delete(ws);
        updatePresence();
    });
};
//# sourceMappingURL=connection.js.map