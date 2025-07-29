import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";

type ComboOption = { id?: string | null | undefined; name: string };

export default function ComboSingle({
  search,
  setSearch,
  value,
  setValue,
  options,
  create,
}: {
  search: string;
  setSearch: (value: string) => void;
  value: ComboOption | null;
  setValue: (value: ComboOption | null) => void;
  options: ComboOption[];
  create?: (name: string) => Promise<ComboOption>;
}) {
  return (
    <Combobox
      as={"div"}
      immediate
      value={value}
      onChange={async (val) => {
        setValue(val);
        if (val && val.id === "__create__" && create) {
          const newVal = await create(val.name);
          setValue(newVal);
        }
      }}
      onClose={() => setSearch("")}
      className={"w-full"}
    >
      {({ open }) => (
        <>
          <ComboboxInput
            onChange={(e) => setSearch(e.target.value)}
            displayValue={(e) => (e as ComboOption)?.name}
            className="border-base-content bg-base w-full border-2 px-2 py-1"
          />
          <AnimatePresence>
            {open && (options.length > 0 || (create && search.length >= 1)) && (
              <ComboboxOptions
                static
                as={motion.div}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                anchor="bottom"
                className="bg-base text-base-content z-10 !max-h-48 w-(--input-width) overflow-y-auto border-2 shadow-lg [--anchor-gap:4px]"
              >
                {options.map((e) => (
                  <ComboboxOption
                    key={e.name}
                    value={e}
                    className="data-focus:bg-primary cursor-pointer px-2 py-1"
                  >
                    {e.name}
                  </ComboboxOption>
                ))}
                {!options.find((e) => e.name === search) &&
                  search.length >= 1 &&
                  create && (
                    <ComboboxOption
                      value={{ id: "__create__", name: search }}
                      className="data-focus:bg-primary cursor-pointer px-2 py-1"
                    >
                      Criar{" "}
                      <span className="font-semibold">
                        &quot;{search}&quot;
                      </span>
                    </ComboboxOption>
                  )}
                {options.length <= 0 && !create && (
                  <div className="px-2 py-1 italic">Oops... Nenhuma opção</div>
                )}
              </ComboboxOptions>
            )}
          </AnimatePresence>
        </>
      )}
    </Combobox>
  );
}
