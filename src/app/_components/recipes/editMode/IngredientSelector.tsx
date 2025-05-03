import { api } from "~/trpc/react";
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { useState } from "react";
import type { Ingredient } from "@prisma/client";
import type { FrontendSectionIngredient } from "~/server/api/routers/recipe";

export default function IngredientSelector({
  value,
  setValue,
}: {
  value: FrontendSectionIngredient["ingredient"];
  setValue: (value: FrontendSectionIngredient["ingredient"]) => void;
}) {
  const ingredientsQuery = api.ingredient.list.useQuery();
  const createQuery = api.ingredient.create.useMutation({
    onSuccess: async (e) => {
      await ingredientsQuery.refetch();
      setValue(e);
    },
  });
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
      onChange={(e) => {
        setValue(e ?? { id: null, name: "" });
        if (e?.id === null) {
          createQuery.mutate({ name: e.name });
        }
      }}
      onClose={() => setSearch("")}
    >
      <ComboboxInput
        onChange={(e) => setSearch(e.target.value)}
        displayValue={(e) => (e as Ingredient)?.name}
        className="border-base-content w-full border-2 px-2 py-1"
      />
      <ComboboxOptions
        anchor="bottom start"
        className="bg-base text-base-content z-10 !max-h-48 w-(--input-width) overflow-y-auto border-2 shadow-lg"
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
              Criar <span className="font-semibold">&quot;{search}&quot;</span>
            </ComboboxOption>
          )}
      </ComboboxOptions>
    </Combobox>
  );
}
