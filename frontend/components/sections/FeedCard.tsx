import Panel from "@/components/shared/Panel";

export const FeedCard = ({
  feed,
}: any) => {
  return (
    <Panel title="Live Feed">
      {feed.map(
        (item: string, index: number) => (
          <div
            key={index}
            className="py-1 text-sm text-zinc-400"
          >
            {item}
          </div>
        )
      )}
    </Panel>
  );
}