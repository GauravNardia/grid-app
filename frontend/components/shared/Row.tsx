
interface Props {
  label: string;
  value: string;
}

const Row = ({ label, value }: Props) => {
  return (
   <div className="flex justify-between py-1 text-sm">
      <span className="text-zinc-500">
        {label}
      </span>
      <span>{value}</span>
    </div>
  )
}

export default Row