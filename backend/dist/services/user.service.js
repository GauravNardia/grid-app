import { eq } from "drizzle-orm";
import { db } from "../db/client.js";
import { users } from "../db/schema/schema.js";
import { randomColor } from "../utils.js";
export const findUserById = async (id) => {
    const result = await db
        .select()
        .from(users)
        .where(eq(users.id, id));
    return result[0] || null;
};
export const createUser = async (name) => {
    const result = await db
        .insert(users)
        .values({
        name,
        color: randomColor() || "#000000",
    })
        .returning();
    return result[0];
};
export const getAllUsers = async () => {
    return db.select().from(users);
};
//# sourceMappingURL=user.service.js.map