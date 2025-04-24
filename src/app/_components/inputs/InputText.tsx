export default function InputText({
  label,
  helper,
  value,
  setValue,
  style = "border-base-content border-2 px-2 py-1",
}: {
  label?: string;
  helper?: string;
  value: string;
  setValue: (value: string) => void;
  style?: string;
}) {
  return (
    <div className="flex w-full flex-col gap-1">
      {label && <div className="font-semibold">{label}:</div>}
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={style}
        placeholder={helper ? "(" + helper + ")" : ""}
      />
    </div>
  );
}
