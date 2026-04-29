
interface Props {
  title: string;
  children: React.ReactNode;
} 

const Panel = ({ title, children }: Props) => {
  return (
    <div className="rounded-2xl border border-zinc-900 bg-zinc-950 p-4">
      <h3 className="mb-3 font-semibold">
        {title}
      </h3>

      {children}
    </div>
  )
}

export default Panel