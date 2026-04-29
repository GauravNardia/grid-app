// import "dotenv/config";
// import { WebSocketServer, WebSocket } from "ws";
// import { eq, and, isNull, asc } from "drizzle-orm";

// import { db } from "./db/client.js";
// import { users, tiles, events } from "./db/schema/schema.js";
// import { randomColor } from "./utils.js";

// const wss = new WebSocketServer({
//   port: Number(process.env.PORT) || 8080,
// });

// console.log(`WebSocket server running on ws://localhost:${wss.options.port}`);

// const clients = new Set<WebSocket>();

// function send(ws: WebSocket, data: unknown) {
//   if (ws.readyState === WebSocket.OPEN) {
//     ws.send(JSON.stringify(data));
//   }
// }

// function broadcast(data: unknown) {
//   const message = JSON.stringify(data);

//   for (const client of clients) {
//     if (client.readyState === WebSocket.OPEN) {
//       client.send(message);
//     }
//   }
// }

// function updatePresence() {
//   broadcast({
//     type: "presence",
//     count: clients.size,
//   });
// }

// wss.on("connection", async (ws) => {
//   clients.add(ws);
//   updatePresence();

//   console.log("✅ Client connected");

//   try {
//     /* Send Full Grid State */
//     const board = await db
//       .select()
//       .from(tiles)
//       .orderBy(asc(tiles.y), asc(tiles.x));

//     send(ws, {
//       type: "grid_state",
//       payload: board,
//     });

//     const allUsers = await db.select().from(users);
//     send(ws, {
//       type: "users_list",
//       payload: allUsers,
//     });
//   } catch (error) {
//     console.error("❌ Failed loading board:", error);
//   }

//   /* ------------------------------------------------
//      Receive Messages
//   ------------------------------------------------ */
//   ws.on("message", async (raw) => {
//     let data: any;

//     try {
//       data = JSON.parse(raw.toString());
//     } catch {
//       send(ws, {
//         type: "error",
//         message: "Invalid JSON",
//       });
//       return;
//     }
//     if (data.type === "join") {
//   try {
//     let user = null;

//     const playerName =
//       typeof data.name === "string" && data.name.trim().length > 0
//         ? data.name.trim()
//         : "Guest";

//     /* Existing user */
//     if (data.userId) {
//       const existing = await db
//         .select()
//         .from(users)
//         .where(eq(users.id, data.userId));

//       if (existing.length > 0) {
//         user = existing[0];
//       }
//     }

//     /* Create new user */
//     if (!user) {
//       const inserted = await db
//         .insert(users)
//         .values({
//           name: playerName || "Guest",
//           color: randomColor() || "#000000", // Default color fallback
//         })
//         .returning();

//       user = inserted[0];
//     }

//     send(ws, {
//       type: "joined",
//       payload: user,
//     });

//     return;
//   } catch (error) {
//     console.error("Join error:", error);

//     send(ws, {
//       type: "error",
//       message: "Failed to join",
//     });

//     return;
//   }
// }

//     /* ==========================================
//        CLAIM TILE
//     ========================================== */
// if (data.type === "claim_tile") {
//   try {
//     const updatedTile = await db
//       .update(tiles)
//       .set({
//         ownerId: data.userId,
//         claimedAt: new Date(),
//         updatedAt: new Date(),
//       })
//       .where(
//         and(
//           eq(tiles.id, data.tileId),
//           isNull(tiles.ownerId)
//         )
//       )
//       .returning();

//     /* Already claimed */
//     if (!updatedTile.length) {
//       send(ws, {
//         type: "error",
//         message: "Tile already claimed",
//       });

//       return;
//     }

//     const tile = updatedTile[0];

//     /* Save Event */
//     await db.insert(events).values({
//       userId: data.userId,
//       tileId: data.tileId,
//       action: "claimed",
//     });

//     /* Find user name */
//     const userRow = await db
//       .select()
//       .from(users)
//       .where(eq(users.id, data.userId));

//     const playerName =
//       userRow.length > 0
//         ? userRow[0]?.name
//         : "Unknown";

//     /* Broadcast */
//     broadcast({
//       type: "tile_updated",
//       payload: tile,
//       meta: `${playerName} claimed (${tile?.x}, ${tile?.y})`,
//     });

//     console.log(`🟩 ${playerName} claimed tile ${tile?.id}`);
//   } catch (error) {
//     console.error("Claim error:", error);

//     send(ws, {
//       type: "error",
//       message: "Failed to claim tile",
//     });
//   }

//   return;
// }

//     /* ==========================================
//        UNKNOWN EVENT
//     ========================================== */
//     send(ws, {
//       type: "error",
//       message: "Unknown event type",
//     });
//   });

//   /* ------------------------------------------------
//      Disconnect
//   ------------------------------------------------ */
//   ws.on("close", () => {
//     clients.delete(ws);
//     updatePresence();

//     console.log("❌ Client disconnected");
//   });
// });
import "./socket/server.js";