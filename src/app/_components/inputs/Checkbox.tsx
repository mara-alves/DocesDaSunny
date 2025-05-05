import { Check } from "lucide-react";

export default function Checkbox({ value }: { value: boolean }) {
  return (
    <div
      className={
        "border-base-content size-5 border-2 " +
        (value ? "bg-base-content" : "")
      }
    >
      <Check
        className={
          "text-white transition " +
          (value ? "size-4 opacity-100" : "size-0 opacity-0")
        }
      />
    </div>
  );
}
