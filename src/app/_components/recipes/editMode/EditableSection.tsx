import { ChevronDown, ChevronUp, Plus, Trash, X } from "lucide-react";
import InputText from "../../inputs/InputText";
import InputTextarea from "../../inputs/InputTextarea";
import type {
  FrontendSection,
  FrontendSectionIngredient,
} from "~/server/api/routers/recipe";
import { api } from "~/trpc/react";
import ComboSingle from "../../inputs/ComboSingle";
import { useEffect, useRef } from "react";

export default function EditableSection({
  section,
  editSection,
  deleteSection,
  moveSectionUp,
  moveSectionDown,
}: {
  section: FrontendSection;
  editSection: (
    key: keyof FrontendSection,
    value: string | string[] | FrontendSectionIngredient[],
  ) => void;
  deleteSection: () => void;
  moveSectionUp: null | (() => void);
  moveSectionDown: null | (() => void);
}) {
  const ingredientsQuery = api.ingredient.list.useQuery();
  const createQuery = api.ingredient.create.useMutation({
    onSuccess: async () => {
      await ingredientsQuery.refetch();
    },
  });

  const lastIngredientRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    lastIngredientRef.current?.focus();
  }, [section.ingredients.length]);

  const addIngredient = () => {
    const ing = section.ingredients;
    ing.push({ quantity: "", ingredient: { id: null, name: "" } });
    editSection("ingredients", ing);
  };
  const editIngredient = <K extends keyof FrontendSectionIngredient>(
    ingredientIdx: number,
    key: K,
    value: FrontendSectionIngredient[K],
  ) => {
    const ing = section.ingredients;
    ing[ingredientIdx]![key] = value;
    editSection("ingredients", ing);
  };
  const deleteIngredient = (ingredientIdx: number) => {
    const ing = section.ingredients;
    ing.splice(ingredientIdx, 1);
    editSection("ingredients", ing);
  };

  const addStep = () => {
    const prep = section.preparation;
    prep.push("");
    editSection("preparation", prep);
  };
  const editStep = (stepIdx: number, value: string) => {
    const prep = section.preparation;
    prep[stepIdx] = value;
    editSection("preparation", prep);
  };
  const deleteStep = (stepIdx: number) => {
    const prep = section.preparation;
    prep.splice(stepIdx, 1);
    editSection("preparation", prep);
  };

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="relative w-full">
        <div className="absolute -top-1 right-0 flex flex-row gap-2">
          {moveSectionUp && (
            <ChevronUp className="icon-btn" onClick={moveSectionUp} />
          )}
          {moveSectionDown && (
            <ChevronDown className="icon-btn" onClick={moveSectionDown} />
          )}
          <button className="icon-btn" onClick={deleteSection}>
            <Trash />
          </button>
        </div>
        <InputText
          label="Nome da Secção"
          helper="Opcional, p.ex Base, Ganache, Praliné..."
          value={section.name}
          setValue={(e) => editSection("name", e)}
          style="border-2 border-dashed border-primary-darker px-2 py-1 heading text-xl"
        />
      </div>

      <div className="divide-primary flex grid-cols-[0.5fr_1fr] flex-col md:grid md:divide-x-2">
        <div className="flex w-full flex-col gap-4 md:pr-4">
          <div className="heading text-xl">Ingredientes</div>
          {section.ingredients.map((item, idx) => (
            <div key={idx} className="flex w-full flex-row items-center gap-2">
              <div className="bg-base-content size-2 shrink-0 rounded-full" />
              <InputText
                value={item.quantity}
                setValue={(e) => editIngredient(idx, "quantity", e)}
                style="border-base-content border-2 px-2 py-1"
                width="w-24"
                helper="qtd"
                ref={
                  idx === section.ingredients.length - 1
                    ? lastIngredientRef
                    : null
                }
              />
              <ComboSingle
                value={item.ingredient}
                setValue={(e) =>
                  editIngredient(idx, "ingredient", e ?? { id: null, name: "" })
                }
                options={ingredientsQuery.data ?? []}
                create={async (e) => await createQuery.mutateAsync({ name: e })}
              />
              <button
                className="icon-btn"
                onClick={() => deleteIngredient(idx)}
              >
                <X />
              </button>
            </div>
          ))}
          <button
            className="icon-btn flex justify-center"
            onClick={() => addIngredient()}
          >
            <Plus />
          </button>
        </div>

        <div className="flex flex-col gap-4 md:pl-4">
          <div className="heading text-xl">Preparação</div>
          {section.preparation.map((step, idx) => (
            <div key={idx} className="flex flex-row justify-start gap-2">
              <p className="heading text-xl">{idx + 1}.</p>
              <InputTextarea
                value={step}
                setValue={(e) => editStep(idx, e)}
                style="transition focus-visible:outline-none focus-visible:border-base-content border-primary border-b-2 p-0.5 "
              />
              <button
                className="icon-btn my-auto"
                onClick={() => deleteStep(idx)}
              >
                <X />
              </button>
            </div>
          ))}
          <button
            className="icon-btn flex justify-center"
            onClick={() => addStep()}
          >
            <Plus />
          </button>
        </div>
      </div>
    </div>
  );
}
