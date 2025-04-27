import { CookingPot, Scale } from "lucide-react";
import Logo from "~/app/_images/Logo.svg";
import Gradient from "~/app/_images/Gradient.png";
import StyledDisclosure from "./StyledDisclosure";
import Image from "next/image";
import Search from "../inputs/Search";

export default function Sidebar({
  search,
  setSearch,
  resultsCount,
}: {
  search: string;
  setSearch: (value: string) => void;
  resultsCount: number;
}) {
  return (
    <aside className="relative z-10 flex w-full flex-col items-center gap-8 md:w-fit">
      <Logo />
      <Image
        src={Gradient}
        alt={"Gradient"}
        className="pointer-events-none absolute top-0 -z-10 scale-200"
      />
      <div className="flex w-full flex-col gap-3">
        <StyledDisclosure
          icon={<CookingPot />}
          title="Filtrar Receitas"
          content={
            <div className="flex flex-col gap-3 p-3">
              <Search value={search} setValue={setSearch} />
            </div>
          }
        />
        <StyledDisclosure
          icon={<Scale />}
          title="Conversor de Medidas"
          content={<div>Hello world</div>}
        />
      </div>
      <div className="heading text-lg">
        {resultsCount} resultado{resultsCount != 1 ? "s" : ""}
      </div>
    </aside>
  );
}
