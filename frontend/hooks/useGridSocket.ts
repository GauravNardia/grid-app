"use client";

import { useEffect, useRef, useState } from "react";
import { WS_URL } from "@/lib/constants";
import { Tile, User } from "@/lib";

export const useGridSocket = () => {
  const wsRef = useRef<WebSocket | null>(null);

  const [user, setUser] = useState<User | null>(null);
  const [name, setName] = useState("");
  const [tiles, setTiles] = useState<Tile[]>([]);
  const [players, setPlayers] = useState<Record<string, string>>({});
  const [feed, setFeed] = useState<string[]>([]);
  const [online, setOnline] = useState(0);
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("grid-user");

    if (saved) {
      const parsed = JSON.parse(saved);
      setUser(parsed);
      setName(parsed.name);
    }

    setLoading(false);

    const ws = new WebSocket(WS_URL);
    wsRef.current = ws;

    ws.onopen = () => {
      setConnected(true);

      if (saved) {
        const parsed = JSON.parse(saved);

        send({
          type: "join",
          name: parsed.name,
          userId: parsed.id,
        });
      }
    };

    ws.onclose = () => setConnected(false);

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);

      switch (msg.type) {
        case "joined":
          setUser(msg.payload);

          localStorage.setItem(
            "grid-user",
            JSON.stringify(msg.payload)
          );
          break;

        case "grid_state":
          setTiles(msg.payload);
          break;

        case "users_list":
          const map: Record<string, string> = {};

          msg.payload.forEach((p: any) => {
            map[p.id] = p.name;
          });

          setPlayers(map);
          break;

        case "tile_updated":
          setTiles((prev) =>
            prev.map((tile) =>
              tile.id === msg.payload.id
                ? msg.payload
                : tile
            )
          );

          setFeed((prev) =>
            [msg.meta, ...prev].slice(0, 10)
          );
          break;

        case "feed_history":
          setFeed(
            msg.payload.map(
              (item: any) => item.action
            )
          );
          break;

        case "presence":
          setOnline(msg.count);
          break;
      }
    };

    return () => ws.close();
  }, []);

  const send = (data: unknown) => {
    if (
      wsRef.current &&
      wsRef.current.readyState === WebSocket.OPEN
    ) {
      wsRef.current.send(JSON.stringify(data));
    }
  };

  const showError = (message: string) => {
  setError(message);

  setTimeout(() => {
    setError("");
  }, 2500);
};

  const joinArena = () => {
    if (!name.trim()) return;

    send({
      type: "join",
      name,
      userId: user?.id || null,
    });
  };

const claimTile = (tile: Tile) => {
  if (!user) return;

  if (tile.ownerId) {
    showError("This tile is already claimed");
    return;
  }

  send({
    type: "claim_tile",
    tileId: tile.id,
    userId: user.id,
  });
};

  const logout = () => {
    localStorage.removeItem("grid-user");

    wsRef.current?.close();

    setUser(null);
    setName("");
    setFeed([]);
    setOnline(0);
  };

  return {
    user,
    name,
    setName,
    tiles,
    players,
    feed,
    online,
    connected,
    loading,
    joinArena,
    claimTile,
    logout,
    error,
  };
}