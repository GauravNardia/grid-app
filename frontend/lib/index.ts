export type User = {
  id: string;
  name: string;
  color: string;
};

export type Tile = {
  id: string;
  x: number;
  y: number;
  ownerId: string | null;
};

export type LeaderboardItem = [string, number];