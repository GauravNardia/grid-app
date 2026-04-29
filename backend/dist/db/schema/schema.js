import { pgTable, text, uuid, timestamp, integer, index } from "drizzle-orm/pg-core";
export const users = pgTable("users", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(),
    color: text("color").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    lastSeenAt: timestamp("last_seen_at").defaultNow().notNull(),
});
export const tiles = pgTable("tiles", {
    id: uuid("id").defaultRandom().primaryKey(),
    x: integer("x").notNull(),
    y: integer("y").notNull(),
    ownerId: uuid("owner_id").references(() => users.id),
    claimedAt: timestamp("claimed_at"),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
export const events = pgTable("events", {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id").references(() => users.id),
    tileId: uuid("tile_id").references(() => tiles.id),
    action: text("action").notNull(), // claimed
    createdAt: timestamp("created_at").defaultNow(),
});
//# sourceMappingURL=schema.js.map