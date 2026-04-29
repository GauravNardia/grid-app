import Panel from "@/components/shared/Panel";
import Row from "@/components/shared/Row";

export const StatsCard = ({
  claims,
  online,
}: any) => {
  return (
    <Panel title="Stats">
      <Row label="Claims" value={claims} />
      <Row label="Online" value={online} />
    </Panel>
  );
}