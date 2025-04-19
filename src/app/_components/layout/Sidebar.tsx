import { CookingPot, Scale } from "lucide-react";
import Logo from "~/app/_images/Logo.svg";
import Gradient from "~/app/_images/Gradient.png";
import StyledDisclosure from "./StyledDisclosure";
import Image from "next/image";

export default function Sidebar() {
  return (
    <aside className="relative z-10 flex w-full flex-col items-center gap-8 md:w-fit">
      <Logo />
      <Image
        src={Gradient}
        alt={"Gradient"}
        className="absolute top-0 -z-10 scale-200"
      />
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
