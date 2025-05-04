import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { ChevronDown } from "lucide-react";
import type { ReactNode } from "react";

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
    <Listbox value={value} onChange={setValue}>
      <ListboxButton
        className={
          "bg-base border-base-content flex flex-row gap-1.5 border-2 px-2 py-1"
        }
      >
        {value?.icon}
        {value?.label}
        <ChevronDown className="ml-auto" />
      </ListboxButton>
      <ListboxOptions
        anchor="bottom"
        className="bg-base text-base-content z-10 !max-h-48 w-(--button-width) overflow-y-auto border-2 shadow-lg"
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
    </Listbox>
  );
}
