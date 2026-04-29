"use client";

import type { User } from "@/lib";

type HeaderProps = {
  user: User;
  online: number;
  logout: () => void;
};

export default function Header({
  user,
  online,
  logout,
}: HeaderProps) {
  return (
    <header className="w-full flex items-center justify-between border-b border-zinc-900 px-6 py-4">
      <div>
        <h1 className="text-3xl font-bold">
          Grid
        </h1>

        <p className="text-sm text-zinc-500">
          Realtime Shared Grid
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-right text-sm">
          <p>{user.name}</p>
          <p>{online} online</p>
        </div>
      </div>
    <button
      onClick={logout}
      className="rounded-xl border border-zinc-800 px-3 py-2 text-sm cursor-pointer hover:bg-zinc-900"
      >
          Switch Player
    </button>
    </header>
  );
}