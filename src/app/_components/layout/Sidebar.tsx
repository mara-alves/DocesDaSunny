import { CookingPot, Scale } from "lucide-react";
import Logo from "~/app/_images/Logo.svg";

export default function Sidebar() {
  return (
    <aside className="flex w-fit flex-col items-center gap-3">
      <Logo />
      <div className="border-base-content bg-primary flex w-full flex-row items-center gap-4 border-2 px-4 py-2 font-semibold">
        <CookingPot />
        Filtrar Receitas
      </div>
      <div className="border-base-content bg-primary flex w-full flex-row items-center gap-4 border-2 px-4 py-2 font-semibold">
        <Scale />
        Conversor de Medidas
      </div>
    </aside>
  );
}
