import type { Recipe, Section } from "@prisma/client";
import { ChevronLeft, CookingPot, Hourglass, Plus } from "lucide-react";
import InputText from "../inputs/InputText";
import { useState } from "react";
import InputTime from "../inputs/InputTime";
import InputTextarea from "../inputs/InputTextarea";
import { api } from "~/trpc/react";

type FrontendRecipe = Omit<Recipe, "id" | "createdAt"> & {
  sections: Omit<Section, "id" | "recipeId">[];
};

const EmptyRecipe: FrontendRecipe = {
  name: "",
  image: null,
  prepSeconds: 0,
  waitSeconds: 0,
  notes: "",
  sections: [
    {
      name: "",
      preparation: [],
    },
  ],
};

export default function EditableRecipe({
  recipe = EmptyRecipe,
  goBack,
}: {
  recipe?: FrontendRecipe;
  goBack: () => void;
}) {
  const createQuery = api.recipe.create.useMutation();
  const [form, setForm] = useState<FrontendRecipe>(recipe);

  const editForm = (key: keyof FrontendRecipe, value: string) => {
    let formattedValue: string | number = value;
    if (key === "prepSeconds" || key === "waitSeconds") {
      const [hours, minutes] = value.split(":");
      formattedValue = +hours! * 3600 + +minutes! * 60;
    }
    setForm({ ...form, [key]: formattedValue });
  };

  const secondsToHHmm = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds - hours * 3600) / 60);
    return (
      hours.toString().padStart(2, "0") +
      ":" +
      minutes.toString().padStart(2, "0")
    );
  };

  return (
    <div className="bg-base absolute top-0 z-10 w-full shadow-lg">
      <div className="p-4">
        <button
          className="flex flex-row items-center gap-2 font-serif italic"
          onClick={goBack}
        >
          <ChevronLeft /> Voltar
        </button>
      </div>
      <div className="bg-background relative flex h-64 items-center overflow-hidden"></div>
      <div className="flex flex-col gap-4 p-4">
        <InputText
          label="Nome"
          value={form.name}
          setValue={(e) => editForm("name", e)}
          style="border-4 border-dashed border-base-content px-2 py-1 font-serif text-4xl font-semibold italic"
        />
        <div className="flex w-full flex-wrap gap-8">
          <InputTime
            icon={<CookingPot className="hidden shrink-0 md:block" />}
            label="Tempo de Preparação"
            value={secondsToHHmm(form.prepSeconds)}
            setValue={(e) => editForm("prepSeconds", e)}
          />
          <InputTime
            icon={<Hourglass className="hidden shrink-0 md:block" />}
            label="Tempo de Espera"
            value={secondsToHHmm(form.waitSeconds)}
            setValue={(e) => editForm("waitSeconds", e)}
          />
        </div>
        <InputTextarea
          label="Notas"
          value={form.notes}
          setValue={(e) => editForm("notes", e)}
          style="border-2 border-base-content px-2 py-1"
        />

        <button
          className="bg-base-content ml-auto flex flex-row items-center gap-2 px-2 py-1 text-base font-semibold"
          onClick={async () => {
            await createQuery.mutateAsync(form);
            goBack();
          }}
        >
          <Plus />
          Criar
        </button>
      </div>
    </div>
  );
}
