export default function InputText({
  label,
  helper,
  value,
  setValue,
  style = "border-base-content border-2 px-2 py-1",
  width = "w-full",
}: {
  label?: string;
  helper?: string;
  value: string;
  setValue: (value: string) => void;
  style?: string;
  width?: string;
}) {
  return (
    <div className={"flex flex-col gap-1 " + width}>
      {label && <div className="font-semibold">{label}:</div>}
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={style}
        placeholder={helper ?? ""}
      />
    </div>
  );
}
