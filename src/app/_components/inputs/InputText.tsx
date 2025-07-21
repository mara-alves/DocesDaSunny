import type { Ref } from "react";

export default function InputText({
  label,
  helper,
  value,
  setValue,
  style = "border-base-content bg-base border-2 px-2 py-1",
  width = "w-full",
  ref,
}: {
  label?: string;
  helper?: string;
  value: string;
  setValue: (value: string) => void;
  style?: string;
  width?: string;
  ref?: Ref<HTMLInputElement>;
}) {
  return (
    <div className={"flex flex-col gap-1 " + width}>
      {label && <div className="font-semibold">{label}:</div>}
      <input
        ref={ref}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={style}
        placeholder={helper ?? ""}
        size={2}
      />
    </div>
  );
}
