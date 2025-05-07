import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import Checkbox from "./Checkbox";

type ComboOption = { id?: string | null | undefined; name: string };

export default function ComboMulti({
  value,
  setValue,
  options,
  create,
}: {
  value: ComboOption[];
  setValue: (value: ComboOption[]) => void;
  options: ComboOption[];
  create?: (name: string) => Promise<ComboOption>;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const outerDivRef = useRef<HTMLDivElement>(null);
  const [search, setSearch] = useState("");

  const filteredOptions =
    search === ""
      ? options
      : (options.filter((e) => {
          return e.name.toLowerCase().includes(search.toLowerCase());
        }) ?? []);

  return (
    <div
      className="border-base-content bg-base flex min-h-12 w-full cursor-text flex-row items-center gap-1.5 border-2 p-1.5"
      onClick={() => inputRef.current?.focus()}
      ref={outerDivRef}
    >
      <div className="flex w-full flex-col">
        <div className="border-primary flex w-full flex-wrap gap-1.5 border-r-2">
          {value.map((e, idx) => (
            <div
              className="bg-primary flex cursor-default flex-row gap-2 px-2 py-1"
              key={e.id}
            >
              {e.name}
              <X
                className="cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  value.splice(idx, 1);
                  setValue([...value]);
                }}
              />
            </div>
          ))}

          <Combobox
            as={"div"}
            immediate
            value={value}
            onChange={async (val) => {
              setValue(val);
              if (create) {
                await Promise.all(
                  val.map(async (e) => (e.id ? e : await create(e.name))),
                ).then((newVal) => {
                  setValue(newVal);
                });
              }
              setSearch("");
            }}
            onClose={() => setSearch("")}
            multiple={true}
            className={"w-full"}
          >
            {({ open }) => (
              <>
                <ComboboxInput
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full focus-visible:outline-none"
                  ref={inputRef}
                />
                <AnimatePresence>
                  {open && (
                    <ComboboxOptions
                      static
                      as={motion.div}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      anchor="bottom start"
                      className="bg-base text-base-content z-10 !max-h-48 w-(--input-width) overflow-y-auto border-2 shadow-lg [--anchor-gap:16px]"
                    >
                      {filteredOptions.map((e) => (
                        <ComboboxOption
                          key={e.name}
                          value={e}
                          className="data-focus:bg-primary flex cursor-pointer flex-row items-center gap-2 px-2 py-1"
                        >
                          <Checkbox
                            value={!!value.find((u) => u.id === e.id)}
                          />
                          {e.name}
                        </ComboboxOption>
                      ))}
                      {!filteredOptions.find((e) => e.name === search) &&
                        search.length >= 1 &&
                        create && (
                          <ComboboxOption
                            value={{ id: null, name: search }}
                            className="data-focus:bg-primary cursor-pointer px-2 py-1"
                          >
                            Criar{" "}
                            <span className="font-semibold">
                              &quot;{search}&quot;
                            </span>
                          </ComboboxOption>
                        )}
                      {filteredOptions.length <= 0 && !create && (
                        <div className="px-2 py-1 italic">
                          Oops... Nenhuma opção
                        </div>
                      )}
                    </ComboboxOptions>
                  )}
                </AnimatePresence>
              </>
            )}
          </Combobox>
        </div>
      </div>
      <X className="icon-btn" onClick={() => setValue([])} />
    </div>
  );
}
