import type { FrontendSectionIngredient } from "~/server/api/routers/recipe";
import InputText from "../../inputs/InputText";
import { api } from "~/trpc/react";
import ComboSingle from "../../inputs/ComboSingle";
import { useState, type Ref } from "react";
import { X } from "lucide-react";

export default function EditableIngredient({
  ingredient,
  editIngredient,
  deleteIngredient,
  ref = null,
}: {
  ingredient: FrontendSectionIngredient;
  editIngredient: <K extends keyof FrontendSectionIngredient>(
    key: K,
    value: FrontendSectionIngredient[K],
  ) => void;
  deleteIngredient: () => void;
  ref?: Ref<HTMLInputElement> | null;
}) {
  const [search, setSearch] = useState("");

  const ingredientsQuery = api.ingredient.restrictedList.useQuery(
    {
      search,
    },
    { placeholderData: (previousData) => previousData },
  );
  const createQuery = api.ingredient.create.useMutation({
    onSuccess: async () => {
      await ingredientsQuery.refetch();
    },
  });

  return (
    <div className="flex w-full flex-row items-center gap-2">
      <div className="bg-base-content size-2 shrink-0 rounded-full" />
      <InputText
        value={ingredient.quantity}
        setValue={(e) => editIngredient("quantity", e)}
        style="border-base-content border-2 px-2 py-1"
        width="w-24"
        helper="qtd"
        ref={ref}
      />
      <ComboSingle
        search={search}
        setSearch={setSearch}
        value={ingredient.ingredient}
        setValue={(e) =>
          editIngredient("ingredient", e ?? { id: null, name: "" })
        }
        options={ingredientsQuery.data ?? []}
        create={async (e) => await createQuery.mutateAsync({ name: e })}
      />
      <button className="icon-btn" onClick={deleteIngredient}>
        <X />
      </button>
    </div>
  );
}
