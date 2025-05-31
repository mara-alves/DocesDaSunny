import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";

export default function TopPageNavigation({
  extraActions,
}: {
  extraActions?: ReactNode;
}) {
  const router = useRouter();

  return (
    <div className="flex flex-row gap-4 px-6 py-4">
      <button
        className="group flex cursor-pointer flex-row items-center font-serif italic"
        onClick={() => router.back()}
      >
        <ChevronLeft className="mr-4 transition-all group-hover:mr-2" />
        Voltar
      </button>
      {extraActions}
    </div>
  );
}
