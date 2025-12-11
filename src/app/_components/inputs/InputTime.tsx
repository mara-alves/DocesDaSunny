import { Clock } from "lucide-react";
import { useRef, type ReactNode } from "react";

export default function InputTime({
  icon,
  label,
  value,
  setValue,
}: {
  icon?: ReactNode;
  label: string;
  value: string;
  setValue: (value: string) => void;
}) {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <div className="flex w-full flex-row items-center gap-2 md:w-fit">
      {icon}
      <div className="font-semibold">{label}:</div>
      <div
        className="border-base-content group ml-auto flex w-fit flex-row items-center gap-1.5 border-2 px-2 py-1 md:ml-0"
        onClick={() => ref.current?.focus()}
      >
        <Clock />
        <input
          ref={ref}
          type="time"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="focus:outline-none"
        />
        h
      </div>
    </div>
  );
}
