import { LoaderCircle } from "lucide-react";
import type { Ref } from "react";

export default function LoadingIndicator({
  ref,
}: {
  ref?: Ref<HTMLDivElement>;
}) {
  return (
    <div
      ref={ref}
      className="flex h-full w-full flex-col items-center justify-center p-8 font-semibold"
    >
      <LoaderCircle className="animate-spin" size={50} />A carregar...
    </div>
  );
}
