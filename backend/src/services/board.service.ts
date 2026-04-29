import { asc } from "drizzle-orm";
import { db } from "../db/client.js";
import { tiles } from "../db/schema/schema.js";

export const getBoard = () => {
  return db
    .select()
    .from(tiles)
    .orderBy(
      asc(tiles.y),
      asc(tiles.x)
    );
}