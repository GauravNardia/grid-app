import { WebSocket } from "ws";
import { send } from "../send.js";
import { findUserById, createUser, } from "../../services/user.service.js";
export const handleJoin = async (ws, data) => {
    try {
        let user = null;
        const name = typeof data.name === "string" &&
            data.name.trim()
            ? data.name.trim()
            : "Guest";
        if (data.userId) {
            user = await findUserById(data.userId);
        }
        if (!user) {
            user = await createUser(name);
        }
        send(ws, {
            type: "joined",
            payload: user,
        });
    }
    catch (error) {
        send(ws, {
            type: "error",
            message: "Join failed",
        });
    }
};
//# sourceMappingURL=join.js.map