"use client";

type Props = {
  name: string;
  setName: (value: string) => void;
  joinArena: () => void;
  connected: boolean;
};

export const JoinGrid = ({
  name,
  setName,
  joinArena,
  connected,
}: Props) => {
  return (
    <div className="min-h-screen bg-black text-white grid place-items-center p-4">
      <div className="w-full max-w-md rounded-3xl border border-zinc-800 bg-zinc-950 p-8 space-y-5">
        <h1 className="text-3xl font-bold">
          Join Grid
        </h1>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter name"
          className="w-full rounded-xl border border-zinc-800 bg-black p-3"
        />

        <button
          onClick={joinArena}
          className="w-full rounded-xl cursor-pointer bg-white text-black p-3 font-semibold"
        >
          {connected ? "Enter Arena" : "Connecting..."}
        </button>
      </div>
    </div>
  );
}