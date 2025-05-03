import { CookingPot, Scale } from "lucide-react";
import Logo from "~/app/_images/Logo.svg";
import Gradient from "~/app/_images/Gradient.png";
import StyledDisclosure from "./StyledDisclosure";
import Image from "next/image";
import Search from "../inputs/Search";
import { Suspense, useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useFiltersContext } from "~/app/_contexts/FiltersContext";

export default function Sidebar() {
  const pathname = usePathname();
  const { count, setOrderBy } = useFiltersContext();
  const [selected, setSelected] = useState<"filters" | "converter" | null>(
    "filters",
  );

  const switchOpen = useCallback(
    (value: "filters" | "converter") => {
      if (selected !== value) {
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
              <div className="flex flex-col gap-3 p-3">
                <Search />
                <div
                  className="bg-base w-full p-2"
                  onClick={() => setOrderBy("alphabetical")}
                >
                  Muda a ordem!
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
          content={<div>Hello world</div>}
        />
      </div>
      {pathname === "/" && (
        <div className="font-serif text-lg italic">
          {count ?? "?"} resultado{count != 1 ? "s" : ""}
        </div>
      )}
    </aside>
  );
}
