import { WebSocket } from "ws";
import { send, broadcast } from "../send.js";

import {
  claimTile,
  saveClaimEvent,
} from "../../services/tile.service.js";

import {
  findUserById,
} from "../../services/user.service.js";

export async function handleClaimTile(
  ws: WebSocket,
  data: any
) {
  try {
    const tile = await claimTile(
      data.tileId,
      data.userId
    );

    if (!tile) {
      return send(ws, {
        type: "error",
        message: "Tile already claimed",
      });
    }

    const user = await findUserById(
      data.userId
    );

    const player =
      user?.name || "Unknown";

    broadcast({
      type: "tile_updated",
      payload: tile,
      meta: `${player} claimed (${tile.x}, ${tile.y})`,
    });

    const message = `${player} claimed (${tile.x}, ${tile.y})`;
    await saveClaimEvent(
      data.userId,
      data.tileId,
      message
    );

  } catch (error) {
    send(ws, {
      type: "error",
      message: "Claim failed",
    });
  }
}