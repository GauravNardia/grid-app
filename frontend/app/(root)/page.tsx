"use client";

import { GridBoard } from "@/components/grid/GridBoard";
import { FeedCard } from "@/components/sections/FeedCard";
import { LeaderboardCard } from "@/components/sections/LeaderboardCard";
import { StatsCard } from "@/components/sections/StatsCard";
import Header from "@/components/shared/Header";
import { JoinGrid } from "@/components/shared/JoinGrid";
import { useGridSocket } from "@/hooks/useGridSocket";
import { useGridStats } from "@/hooks/useGridStats";


export default function Page() {
  const grid = useGridSocket();
  const stats = useGridStats(
    grid.tiles,
    grid.user
  );

  if (grid.loading) {
    return <div className="min-h-screen bg-black" />;
  }

  if (!grid.user) {
    return (
      <JoinGrid
        name={grid.name}
        setName={grid.setName}
        joinArena={grid.joinArena}
        connected={grid.connected}
      />
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Header
        user={grid.user}
        online={grid.online}
        logout={grid.logout}
      />
      {grid.error && (
        <div className="mx-6 mt-4 rounded-xl border border-red-500 bg-red-500/10 p-3 text-sm text-red-300">
          {grid.error}
        </div>
      )}

      <main className="grid gap-6 p-6 lg:grid-cols-[240px_1fr_280px]">
        <StatsCard
          claims={stats.myClaims}
          online={grid.online}
        />

        <GridBoard
          tiles={stats.sortedTiles}
          user={grid.user}
          claimTile={grid.claimTile}
        />

        <div className="space-y-4">
          <LeaderboardCard
            leaderboard={stats.leaderboard}
            players={grid.players}
          />

          <FeedCard feed={grid.feed} />
        </div>
      </main>
    </div>
  );
}