import type { Recipe, Section } from "@prisma/client";
import { ChevronLeft, CookingPot, Hourglass, Plus, Users } from "lucide-react";
import { Fragment, useState } from "react";
import { api } from "~/trpc/react";
import type { PutBlobResult } from "@vercel/blob";
import EditableSection from "./EditableSection";
import { secondsToHHmm } from "~/utils/time";
import InputFile from "../../inputs/InputFile";
import InputNumber from "../../inputs/InputNumber";
import InputText from "../../inputs/InputText";
import InputTextarea from "../../inputs/InputTextarea";
import InputTime from "../../inputs/InputTime";
import { motion } from "framer-motion";

export type FrontendRecipe = Omit<Recipe, "id" | "createdAt"> & {
  sections: (Omit<Section, "id" | "recipeId"> & {
    ingredients: {
      quantity: string;
      ingredient: { id: string | null; name: string };
    }[];
  })[];
};

export type FrontendSection = FrontendRecipe["sections"][number];

const EmptySection: FrontendRecipe["sections"][number] = {
  name: "",
  ingredients: [{ quantity: "", ingredient: { id: null, name: "" } }],
  preparation: [""],
};

const EmptyRecipe: FrontendRecipe = {
  name: "",
  image: null,
  prepSeconds: 0,
  waitSeconds: 0,
  servings: 1,
  notes: "",
  sections: [structuredClone(EmptySection)],
};

export default function EditableRecipe({
  recipe = null,
  goBack,
}: {
  recipe?: FrontendRecipe | null;
  goBack: () => void;
}) {
  const createQuery = api.recipe.create.useMutation();
  const [form, setForm] = useState<FrontendRecipe>(recipe ?? EmptyRecipe);
  const [image, setImage] = useState<File>();

  const editForm = (key: keyof FrontendRecipe, value: string | number) => {
    let formattedValue: string | number = value;
    if (key === "prepSeconds" || key === "waitSeconds") {
      const [hours, minutes] = (value as string).split(":");
      formattedValue = +hours! * 3600 + +minutes! * 60;
    }
    setForm({ ...form, [key]: formattedValue });
  };

  const editSection = <K extends keyof FrontendSection>(
    sectionIdx: number,
    key: K,
    value: FrontendSection[K],
  ) => {
    form.sections[sectionIdx]![key] = value;
    setForm({ ...form });
  };

  const addSection = () => {
    setForm({
      ...form,
      sections: [...form.sections, structuredClone(EmptySection)],
    });
  };

  const deleteSection = (sectionIdx: number) => {
    form.sections.splice(sectionIdx, 1);
    setForm({ ...form });
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
    <motion.div
      layoutId={(recipe?.name ?? "new") + " card"}
      className="bg-base absolute top-0 z-10 w-full shadow-lg"
    >
      <div className="p-4">
        <button
          className="group flex cursor-pointer flex-row items-center font-serif italic"
          onClick={goBack}
        >
          <ChevronLeft className="mr-4 transition-all group-hover:mr-2" />{" "}
          Voltar
        </button>
      </div>

      <InputFile file={image} setFile={setImage} />

      <div className="flex w-full flex-col gap-4 p-4">
        <InputText
          label="Nome da Receita"
          value={form.name}
          setValue={(e) => editForm("name", e)}
          style="border-2 border-dashed border-base-content px-2 py-1 heading text-4xl"
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

        <div className="bg-primary mt-8 h-0.5 w-full" />

        {form.sections.map((section, idx) => (
          <Fragment key={idx}>
            <EditableSection
              section={section}
              editSection={(key, value) => editSection(idx, key, value)}
              deleteSection={() => deleteSection(idx)}
            />
            <div className="bg-primary h-0.5 w-full" />
          </Fragment>
        ))}

        <div className="mb-8 flex flex-row justify-center">
          <button className="btn" onClick={() => addSection()}>
            <Plus /> Adicionar Secção
          </button>
        </div>

        <InputTextarea
          label="Notas"
          value={form.notes ?? ""}
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
    </motion.div>
  );
}
