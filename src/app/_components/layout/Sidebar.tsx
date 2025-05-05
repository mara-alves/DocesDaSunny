import {
  ALargeSmall,
  ArrowDownWideNarrow,
  Clock,
  CookingPot,
  Scale,
} from "lucide-react";
import Logo from "~/app/_images/Logo.svg";
import Gradient from "~/app/_images/Gradient.png";
import StyledDisclosure from "./StyledDisclosure";
import Image from "next/image";
import Search from "../inputs/Search";
import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  useFiltersContext,
  type OrderOption,
} from "~/app/_contexts/FiltersContext";
import SelectMenu from "../inputs/SelectMenu";

export default function Sidebar() {
  const pathname = usePathname();
  const { count, orderBy, setOrderBy } = useFiltersContext();
  const [selected, setSelected] = useState<"filters" | "converter" | null>(
    "filters",
  );

  const switchOpen = useCallback(
    (value: "filters" | "converter") => {
      if (selected === null) {
        setSelected(value);
      } else if (selected === value) {
        setSelected(null);
      } else {
        setSelected(null);
        setTimeout(() => {
          setSelected(value);
        }, 200); // = closing transition duration
      }
    },
    [selected],
  );

  useEffect(() => {
    if (pathname != "/") setSelected("converter");
    else setSelected("filters");
  }, [pathname]);

  const orderMenuOptions = [
    {
      value: "creation",
      label: "Data de Criação",
      icon: <Clock />,
    },
    {
      value: "alphabetical",
      label: "Alfabeto",
      icon: <ALargeSmall />,
    },
  ];

  return (
    <aside className="relative z-10 flex w-full flex-col items-center gap-8 md:w-fit">
      <Logo />
      <Image
        src={Gradient}
        alt={"Gradient"}
        className="pointer-events-none absolute top-0 -z-10 scale-200"
      />
      <div className="flex w-full flex-col gap-3">
        {pathname === "/" && (
          <StyledDisclosure
            open={selected === "filters"}
            setOpen={() => switchOpen("filters")}
            icon={<CookingPot />}
            title="Filtrar Receitas"
            content={
              <div
                className="flex flex-col gap-4 p-3"
                onClick={(e) => e.stopPropagation()}
              >
                <Search />

                <div className="flex flex-col gap-1">
                  <div className="flex flex-row items-center gap-4">
                    <ArrowDownWideNarrow />
                    <span className="font-serif italic">Ordenar por</span>
                  </div>
                  <SelectMenu
                    options={orderMenuOptions}
                    value={orderMenuOptions.find((e) => e.value === orderBy)!}
                    setValue={(e) => setOrderBy(e.value as OrderOption)}
                  />
                </div>
              </div>
            }
          />
        )}
        <StyledDisclosure
          open={selected === "converter"}
          setOpen={() => switchOpen("converter")}
          icon={<Scale />}
          title="Conversor de Medidas"
          content={<div className="p-3">Coming soon</div>}
        />
      </div>
      {pathname === "/" && (
        <div className="font-serif text-xl italic">
          {count ?? "?"} resultado{count != 1 ? "s" : ""}
        </div>
      )}
    </aside>
  );
}
