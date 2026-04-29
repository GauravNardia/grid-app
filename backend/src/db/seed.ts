import "dotenv/config";
import { db } from "./client.js";
import { tiles } from "./schema/schema.js";


async function seed() {
  const data: any = [];
  const size = 20;

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      data.push({ x, y });
    }
  }

  await db.insert(tiles).values(data);

  console.log("Seeded successfully");
}

seed();