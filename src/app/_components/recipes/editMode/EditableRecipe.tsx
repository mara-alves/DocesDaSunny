import {
  CookingPot,
  Hourglass,
  Plus,
  Save,
  TagIcon,
  Users,
} from "lucide-react";
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
import { useRouter } from "next/navigation";
import type {
  FrontendRecipe,
  FrontendSection,
} from "~/server/api/routers/recipe";
import ComboMulti from "../../inputs/ComboMulti";
import type { Tag } from "@prisma/client";
import toast from "react-hot-toast";
import TopPageNavigation from "../../layout/TopPageNavigation";

type FrontendTag = Omit<Tag, "id"> & { id?: string | null | undefined };

const EmptySection: FrontendSection = {
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
  sections: [EmptySection],
  tags: [],
};

export default function EditableRecipe({
  recipe = null,
}: {
  recipe?: (FrontendRecipe & { id: string }) | null;
}) {
  const router = useRouter();
  const trpcUtils = api.useUtils();

  const [form, setForm] = useState<FrontendRecipe>(
    recipe ?? structuredClone(EmptyRecipe),
  );
  // undefined = initial state; null = user pressed trash icon
  const [image, setImage] = useState<File | undefined | null>();

  const createMutation = api.recipe.create.useMutation({
    onSuccess: async () => {
      await trpcUtils.recipe.list.invalidate();
      router.push("/");
    },
  });
  const editMutation = api.recipe.edit.useMutation({
    onSuccess: async () => {
      if (image !== undefined || form.name !== recipe?.name)
        await trpcUtils.recipe.list.invalidate();
      await trpcUtils.recipe.getById.invalidate();
      router.push(`/${recipe!.id}`);
    },
  });

  const tagsQuery = api.recipe.listTags.useQuery();
  const createTagQuery = api.recipe.createTag.useMutation({
    onSuccess: async () => {
      await tagsQuery.refetch();
    },
  });

  const editForm = (
    key: keyof FrontendRecipe,
    value: string | number | FrontendTag[],
  ) => {
    let formattedValue: string | number | FrontendTag[] = value;
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
    if (!form.name) {
      toast.error("É obrigatório dares um nome à receita!");
      return;
    }

    const fullSave = async () => {
      const imgUrlToDel = image !== undefined ? recipe?.image : null;

      if (image) {
        const response = await fetch(
          `/api/image/upload?filename=${image.name}`,
          {
            method: "POST",
            body: image,
          },
        );
        const blob = (await response.json()) as PutBlobResult;
        form.image = blob.url;
        setForm({ ...form });
      } else if (image === null) {
        form.image = null;
        setForm({ ...form });
      }

      if (!recipe) await createMutation.mutateAsync(form);
      else
        await editMutation.mutateAsync({
          id: recipe.id,
          data: form,
          imgUrlToDel,
        });
    };

    await toast.promise(fullSave(), {
      loading: "A guardar...",
      success: "Receita guardada!",
      error: "Ocorreu um erro :(",
    });
  };

  return (
    <>
      <TopPageNavigation />

      <InputFile initialUrl={recipe?.image} setFile={setImage} />

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
        <div className="flex flex-row items-center gap-2">
          <TagIcon />
          <span className="font-semibold">Tags:</span>
          <ComboMulti
            value={form.tags}
            setValue={(e) => editForm("tags", e)}
            options={tagsQuery.data ?? []}
            create={async (e) => await createTagQuery.mutateAsync({ name: e })}
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

        <button className="btn mt-4 ml-auto text-xl" onClick={saveChanges}>
          <Save />
          {recipe ? "Guardar Alterações" : "Criar Receita"}
        </button>
      </div>
    </>
  );
}
