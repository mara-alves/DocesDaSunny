import CustomChevron from "~/app/_images/CustomChevron.svg";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";

export default function TopPageNavigation({
  extraActions,
  prevPage = "/",
}: {
  extraActions?: ReactNode;
  prevPage?: string;
}) {
  const router = useRouter();

  return (
    <div className="flex flex-row gap-4 px-6 py-4">
      <button
        className="group flex cursor-pointer flex-row items-center font-serif italic"
        onClick={() => router.push(prevPage)}
      >
        <CustomChevron className="mr-4 rotate-90 transition-all group-hover:mr-2" />
        Voltar
      </button>
      {extraActions}
    </div>
  );
}
