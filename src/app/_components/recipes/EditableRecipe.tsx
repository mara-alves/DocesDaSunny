import type { Recipe, Section } from "@prisma/client";
import { ChevronLeft, CookingPot, Hourglass, Plus, Users } from "lucide-react";
import InputText from "../inputs/InputText";
import { useState } from "react";
import InputTime from "../inputs/InputTime";
import InputTextarea from "../inputs/InputTextarea";
import { api } from "~/trpc/react";
import InputNumber from "../inputs/InputNumber";
import InputFile from "../inputs/InputFile";
import type { PutBlobResult } from "@vercel/blob";

type FrontendRecipe = Omit<Recipe, "id" | "createdAt"> & {
  sections: Omit<Section, "id" | "recipeId">[];
};

const EmptyRecipe: FrontendRecipe = {
  name: "",
  image: null,
  prepSeconds: 0,
  waitSeconds: 0,
  servings: 1,
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
  const [image, setImage] = useState<File>();

  const editForm = (key: keyof FrontendRecipe, value: string | number) => {
    let formattedValue: string | number = value;
    if (key === "prepSeconds" || key === "waitSeconds") {
      const [hours, minutes] = (value as string).split(":");
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

  const saveChanges = async () => {
    if (image) {
      const response = await fetch(`/api/image/upload?filename=${image.name}`, {
        method: "POST",
        body: image,
      });
      const blob = (await response.json()) as PutBlobResult;
      form.image = blob.url;
      setForm({ ...form });
    }
    await createQuery.mutateAsync(form);
    goBack();
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

      <InputFile file={image} setFile={setImage} />

      <div className="flex flex-col gap-4 p-4">
        <InputText
          label="Nome"
          value={form.name}
          setValue={(e) => editForm("name", e)}
          style="border-2 border-dashed border-base-content px-2 py-1 font-serif text-4xl font-semibold italic"
        />
        <div className="flex w-full flex-wrap gap-4">
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
          <InputNumber
            icon={<Users className="hidden shrink-0 md:block" />}
            label="Número de Porções"
            value={form.servings}
            setValue={(e) => editForm("servings", e)}
          />
        </div>
        <InputTextarea
          label="Notas"
          value={form.notes}
          setValue={(e) => editForm("notes", e)}
        />

        <button
          className="bg-base-content ml-auto flex cursor-pointer flex-row items-center gap-2 px-2 py-1 text-base font-semibold"
          onClick={saveChanges}
        >
          <Plus />
          Criar
        </button>
      </div>
    </div>
  );
}
