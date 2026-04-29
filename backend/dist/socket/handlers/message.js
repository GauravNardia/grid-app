import { WebSocket } from "ws";
import { send } from "../send.js";
import { handleJoin } from "./join.js";
import { handleClaimTile } from "./claimTile.js";
export const handleMessage = async (ws, raw) => {
    let data;
    try {
        data = JSON.parse(raw.toString());
    }
    catch {
        return send(ws, { type: "error", message: "Invalid JSON" });
    }
    switch (data.type) {
        case "join":
            return handleJoin(ws, data);
        case "claim_tile":
            return handleClaimTile(ws, data);
        default:
            return send(ws, {
                type: "error",
                message: "Unknown event",
            });
    }
};
//# sourceMappingURL=message.js.map