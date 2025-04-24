import { type ReactNode } from "react";

export default function InputNumber({
  icon,
  label,
  value,
  setValue,
}: {
  icon?: ReactNode;
  label: string;
  value: number;
  setValue: (value: number) => void;
}) {
  return (
    <div className="flex flex-row items-center gap-2">
      {icon}
      <div className="font-semibold">{label}:</div>
      <input
        type="number"
        size={2}
        value={value}
        onChange={(e) => setValue(+e.target.value)}
        className="border-base-content border-2 px-2 py-1"
      />
    </div>
  );
}
