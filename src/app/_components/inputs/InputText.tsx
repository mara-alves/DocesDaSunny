export default function InputText({
  label,
  value,
  setValue,
  style,
}: {
  label: string;
  value: string;
  setValue: (value: string) => void;
  style?: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <div className="font-semibold">{label}:</div>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={style}
      />
    </div>
  );
}
