import { Tile, User } from "@/lib";

export const GridBoard = ({
  tiles,
  user,
  claimTile,
}: any) => {
  return (
    <section>
      <div className="rounded-3xl border border-zinc-900 bg-zinc-950 p-4">
        <div className="grid grid-cols-20 gap-1">
          {tiles.map((tile: Tile) => {
            const mine =
              tile.ownerId === user.id;

            return (
              <button
                key={tile.id}
                onClick={() =>
                  claimTile(tile)
                }
                className={`aspect-square rounded-md border ${
                  tile.ownerId
                    ? mine
                      ? "bg-emerald-500"
                      : "bg-blue-500"
                    : "bg-black border-zinc-900"
                }`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}