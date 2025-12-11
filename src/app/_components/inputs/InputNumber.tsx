import { type ReactNode } from "react";

export default function InputNumber({
  icon,
  label,
  value,
  setValue,
  style = "border-base-content bg-base border-2 px-2 py-1",
  min = 0,
  max,
}: {
  icon?: ReactNode;
  label?: string;
  value: number | null;
  setValue: (value: number | null) => void;
  style?: string;
  min?: number;
  max?: number;
}) {
  return (
    <div className="flex w-full flex-row items-center gap-2 md:w-fit">
      {icon}
      {label && <div className="font-semibold">{label}:</div>}
      <input
        type="number"
        size={2}
        value={value ?? ""}
        onChange={(e) => setValue(e.target.value ? +e.target.value : null)}
        className={style}
        min={min}
        max={max}
      />
    </div>
  );
}
