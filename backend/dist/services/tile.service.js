import { and, asc, desc, eq, isNull } from "drizzle-orm";
import { db } from "../db/client.js";
import { tiles, events, users } from "../db/schema/schema.js";
import { send } from "../socket/send.js";
import WebSocket from "ws";
export const claimTile = async (tileId, userId) => {
    const result = await db
        .update(tiles)
        .set({
        ownerId: userId,
        claimedAt: new Date(),
        updatedAt: new Date(),
    })
        .where(and(eq(tiles.id, tileId.toString()), isNull(tiles.ownerId)))
        .returning();
    return result[0] || null;
};
export const saveClaimEvent = async (userId, tileId, message) => {
    await db.insert(events).values({
        userId,
        tileId,
        action: message,
    });
};
export const loadInitialData = async (ws) => {
    const board = await db
        .select()
        .from(tiles)
        .orderBy(asc(tiles.y), asc(tiles.x));
    const recentEvents = await db
        .select()
        .from(events)
        .orderBy(desc(events.createdAt))
        .limit(10);
    const allUsers = await db
        .select()
        .from(users);
    send(ws, {
        type: "grid_state",
        payload: board,
    });
    send(ws, {
        type: "users_list",
        payload: allUsers,
    });
    send(ws, {
        type: "feed_history",
        payload: recentEvents,
    });
};
//# sourceMappingURL=tile.service.js.map