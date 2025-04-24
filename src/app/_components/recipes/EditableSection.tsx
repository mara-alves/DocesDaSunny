import type { Section } from "@prisma/client";
import InputText from "../inputs/InputText";
import { Plus, Trash, X } from "lucide-react";
import InputTextarea from "../inputs/InputTextarea";

export default function EditableSection({
  section,
  editSection,
  deleteSection,
}: {
  section: Omit<Section, "id" | "recipeId">;
  editSection: (
    key: keyof Omit<Section, "id" | "recipeId">,
    value: string | string[],
  ) => void;
  deleteSection: () => void;
}) {
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
      <div className="flex w-full flex-row items-start gap-4">
        <InputText
          label="Nome da Secção"
          helper="Opcional, p.ex Base, Ganache, Praliné..."
          value={section.name}
          setValue={(e) => editSection("name", e)}
          style="border-2 border-dashed border-primary-darker px-2 py-1 heading text-xl"
        />
        <Trash
          className="text-primary-darker hover:text-base-content cursor-pointer transition"
          onClick={deleteSection}
        />
      </div>

      <div className="divide-primary flex grid-cols-[0.5fr_1fr] flex-col gap-4 divide-x-2 md:grid">
        <div className="flex flex-col gap-4">
          <div className="heading text-xl">Ingredientes</div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="heading text-xl">Preparação</div>
          {section.preparation.map((step, idx) => (
            <div key={idx} className="flex flex-row justify-start gap-2">
              <p className="heading text-xl">{idx + 1}.</p>
              <InputTextarea
                value={step}
                setValue={(e) => editStep(idx, e)}
                style="transition focus-visible:outline-none focus-visible:border-base-content border-primary border-b-2 p-0.5 "
              />
              <X
                className="text-primary-darker hover:text-base-content cursor-pointer transition"
                onClick={() => deleteStep(idx)}
              />
            </div>
          ))}
          <button
            className="text-primary-darker hover:text-base-content flex cursor-pointer justify-center transition"
            onClick={() => addStep()}
          >
            <Plus />
          </button>
        </div>
      </div>
    </div>
  );
}
