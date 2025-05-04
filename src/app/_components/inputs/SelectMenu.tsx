import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { ChevronDown } from "lucide-react";
import type { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";

type SelectOption = { value: string; label: string; icon?: ReactNode };

export default function SelectMenu({
  value,
  setValue,
  options,
}: {
  value: SelectOption;
  setValue: (value: SelectOption) => void;
  options: SelectOption[];
}) {
  return (
    <Listbox value={value} onChange={setValue} as={"div"} className={"w-full"}>
      {({ open }) => (
        <>
          <ListboxButton
            className={
              "bg-base border-base-content flex w-full flex-row gap-1.5 border-2 px-2 py-1"
            }
          >
            {value?.icon}
            {value?.label}
            <ChevronDown className="ml-auto" />
          </ListboxButton>
          <AnimatePresence>
            {open && (
              <ListboxOptions
                static
                as={motion.div}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                anchor="bottom"
                className="bg-base text-base-content z-10 !max-h-48 w-(--button-width) origin-top overflow-y-auto border-2 shadow-lg"
              >
                {options.map((option, idx) => (
                  <ListboxOption
                    key={idx}
                    value={option}
                    className="data-focus:bg-primary flex cursor-pointer flex-row gap-1.5 px-2 py-1"
                  >
                    {option.icon}
                    {option.label}
                  </ListboxOption>
                ))}
              </ListboxOptions>
            )}
          </AnimatePresence>
        </>
      )}
    </Listbox>
  );
}
