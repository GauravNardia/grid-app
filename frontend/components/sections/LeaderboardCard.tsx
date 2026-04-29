import Panel from "@/components/shared/Panel";
import Row from "@/components/shared/Row";

export const LeaderboardCard = ({
  leaderboard,
  players,
}: any) => {
  return (
    <Panel title="Leaderboard">
      {leaderboard.map(
        ([id, score]: any, index: number) => (
          <Row
            key={id}
            label={`#${index + 1} ${
              players[id] || id.slice(0, 6)
            }`}
            value={score}
          />
        )
      )}
    </Panel>
  );
}