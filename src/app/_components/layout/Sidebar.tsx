import { CookingPot, Scale } from "lucide-react";
import Logo from "~/app/_images/Logo.svg";
import StyledDisclosure from "./StyledDisclosure";

export default function Sidebar() {
  return (
    <aside className="flex w-fit flex-col items-center gap-8">
      <Logo />
      <div className="flex w-full flex-col gap-3">
        <StyledDisclosure
          icon={<CookingPot />}
          title="Filtrar Receitas"
          content={<div>Hello world</div>}
        />
        <StyledDisclosure
          icon={<Scale />}
          title="Conversor de Medidas"
          content={<div>Hello world</div>}
        />
      </div>
    </aside>
  );
}
