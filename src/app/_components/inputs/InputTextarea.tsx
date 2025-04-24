export default function InputTextarea({
  label,
  value,
  setValue,
  style = "border-base-content border-2 px-2 py-1 min-h-24",
}: {
  label?: string;
  value: string;
  setValue: (value: string) => void;
  style?: string;
}) {
  return (
    <div className="flex w-full flex-col gap-1">
      {label && <div className="font-semibold">{label}:</div>}
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={style}
      />
    </div>
  );
}
