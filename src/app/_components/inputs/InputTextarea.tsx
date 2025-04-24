export default function InputTextarea({
  label,
  value,
  setValue,
}: {
  label: string;
  value: string;
  setValue: (value: string) => void;
}) {
  return (
    <div className="flex flex-col gap-1">
      <div className="font-semibold">{label}:</div>
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="border-base-content border-2 px-2 py-1"
      />
    </div>
  );
}
