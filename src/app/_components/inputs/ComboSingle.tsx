import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type ComboOption = { id?: string | null | undefined; name: string };

export default function ComboSingle({
  value,
  setValue,
  options,
  create,
}: {
  value: ComboOption | null;
  setValue: (value: ComboOption | null) => void;
  options: ComboOption[];
  create?: (name: string) => Promise<ComboOption>;
}) {
  const [search, setSearch] = useState("");

  const filteredOptions =
    search === ""
      ? options
      : (options.filter((e) => {
          return e.name.toLowerCase().includes(search.toLowerCase());
        }) ?? []);

  return (
    <Combobox
      as={"div"}
      immediate
      value={value}
      onChange={async (val) => {
        setValue(val);
        if (val && !val.id && create) {
          const newVal = await create((val as ComboOption).name);
          setValue(newVal);
        }
      }}
      onClose={() => setSearch("")}
    >
      {({ open }) => (
        <>
          <ComboboxInput
            onChange={(e) => setSearch(e.target.value)}
            displayValue={(e) => (e as ComboOption)?.name}
            className="border-base-content w-full border-2 px-2 py-1"
          />
          <AnimatePresence>
            {open && (
              <ComboboxOptions
                static
                as={motion.div}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                anchor="bottom"
                className="bg-base text-base-content z-10 !max-h-48 w-(--input-width) overflow-y-auto border-2 shadow-lg"
              >
                {filteredOptions.map((e) => (
                  <ComboboxOption
                    key={e.name}
                    value={e}
                    className="data-focus:bg-primary cursor-pointer px-2 py-1"
                  >
                    {e.name}
                  </ComboboxOption>
                ))}
                {!filteredOptions.find((e) => e.name === search) &&
                  search.length > 2 &&
                  (create ? (
                    <ComboboxOption
                      value={{ id: null, name: search }}
                      className="data-focus:bg-primary cursor-pointer px-2 py-1"
                    >
                      Criar{" "}
                      <span className="font-semibold">
                        &quot;{search}&quot;
                      </span>
                    </ComboboxOption>
                  ) : (
                    <div className="px-2 py-1 italic">
                      Oops... Nenhuma opção
                    </div>
                  ))}
              </ComboboxOptions>
            )}
          </AnimatePresence>
        </>
      )}
    </Combobox>
  );
}
