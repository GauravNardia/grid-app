import { useMemo } from "react";
import { Tile, User } from "@/lib";

export const useGridStats = (
  tiles: Tile[],
  user: User | null
) => {
  const sortedTiles = useMemo(() => {
    return [...tiles].sort((a, b) =>
      a.y === b.y ? a.x - b.x : a.y - b.y
    );
  }, [tiles]);

  const myClaims = useMemo(() => {
    if (!user) return 0;

    return tiles.filter(
      (tile) => tile.ownerId === user.id
    ).length;
  }, [tiles, user]);

  const leaderboard = useMemo(() => {
    const counts = new Map<string, number>();

    for (const tile of tiles) {
      if (!tile.ownerId) continue;

      counts.set(
        tile.ownerId,
        (counts.get(tile.ownerId) || 0) + 1
      );
    }

    return [...counts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
  }, [tiles]);

  return {
    sortedTiles,
    myClaims,
    leaderboard,
  };
}