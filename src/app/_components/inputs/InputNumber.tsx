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
    <div className="flex w-full flex-row items-center gap-2 md:w-fit">
      {icon}
      <div className="font-semibold">{label}:</div>
      <input
        type="number"
        size={2}
        value={value}
        onChange={(e) => setValue(+e.target.value)}
        className="border-base-content ml-auto border-2 px-2 py-1"
      />
    </div>
  );
}
