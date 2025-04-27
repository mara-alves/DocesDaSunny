import { api } from "~/trpc/react";
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { useState } from "react";
import type { Ingredient } from "@prisma/client";
import type { FrontendSectionIngredient } from "./EditableSection";

export default function IngredientSelector({
  value,
  setValue,
}: {
  value: FrontendSectionIngredient["ingredient"];
  setValue: (value: FrontendSectionIngredient["ingredient"]) => void;
}) {
  const ingredientsQuery = api.recipe.listAllIngredients.useQuery();
  const [search, setSearch] = useState("");

  const filteredIngredients =
    search === ""
      ? (ingredientsQuery.data ?? [])
      : (ingredientsQuery.data?.filter((e) => {
          return e.name.toLowerCase().includes(search.toLowerCase());
        }) ?? []);

  return (
    <Combobox
      immediate
      value={value}
      onChange={setValue}
      onClose={() => setSearch("")}
    >
      <ComboboxInput
        onChange={(e) => setSearch(e.target.value)}
        displayValue={(e) => (e as Ingredient)?.name}
        className="border-base-content w-full border-2 px-2 py-1"
      />
      <ComboboxOptions
        anchor="bottom start"
        className="bg-base text-base-content z-10 w-(--input-width) border-x-2 border-b-2 shadow-lg"
      >
        {filteredIngredients.map((e) => (
          <ComboboxOption
            key={e.name}
            value={e}
            className="data-focus:bg-primary cursor-pointer px-2 py-1"
          >
            {e.name}
          </ComboboxOption>
        ))}
        {search.length > 2 &&
          !filteredIngredients.find((e) => e.name === search) && (
            <ComboboxOption
              value={{ id: null, name: search }}
              className="data-focus:bg-primary cursor-pointer px-2 py-1"
            >
              Criar <span className="font-semibold">"{search}"</span>
            </ComboboxOption>
          )}
      </ComboboxOptions>
    </Combobox>
  );
}
