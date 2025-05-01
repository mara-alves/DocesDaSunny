import type { Recipe } from "@prisma/client";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  CookingPot,
  Hourglass,
  Pencil,
  Plus,
  Users,
} from "lucide-react";
import { api, type RouterOutputs } from "~/trpc/react";
import NoImage from "~/app/_images/NoImage.png";
import { secondsToPrettyString } from "~/utils/time";
import { useSession } from "next-auth/react";
import SectionView from "./SectionView";

export default function RecipeView({
  recipe,
  goBack,
  edit,
}: {
  recipe: Recipe;
  goBack: () => void;
  edit: (value: RouterOutputs["recipe"]["getById"]) => void;
}) {
  const { data: session } = useSession();
  const { data: fullRecipe } = api.recipe.getById.useQuery({ id: recipe.id });

  return (
    <motion.div
      layoutId={recipe.name + " card"}
      className="bg-base absolute top-0 z-10 w-full shadow-lg"
    >
      <div className="flex flex-row px-6 py-4">
        <button
          className="group flex cursor-pointer flex-row items-center font-serif italic"
          onClick={goBack}
        >
          <ChevronLeft className="mr-4 transition-all group-hover:mr-2" />
          Voltar
        </button>
        {session?.user && (
          <button
            className="icon-btn ml-auto"
            onClick={() => fullRecipe && edit(fullRecipe)}
          >
            <Pencil />
          </button>
        )}
      </div>

      <motion.div
        layoutId={recipe.name + " image container"}
        className="relative flex h-64 w-full items-center overflow-hidden"
      >
        <motion.img
          layoutId={recipe.name + " image"}
          src={recipe.image ?? NoImage.src}
          alt={recipe.name + " photo"}
          className="w-full"
        />
        <motion.div
          layoutId={recipe.name + " gradient"}
          className="to-base absolute top-0 flex h-full w-full bg-linear-to-b from-0%"
        >
          <div className="heading mx-6 mt-auto text-4xl">{recipe?.name}</div>
        </motion.div>
      </motion.div>

      <div className="flex flex-col gap-8 px-6 pt-3 pb-6">
        <div className="flex flex-row items-center gap-2">
          <CookingPot className="shrink-0" />
          {secondsToPrettyString(recipe.prepSeconds)}
          <Plus className="shrink-0" />
          <Hourglass className="shrink-0" />
          {secondsToPrettyString(recipe.waitSeconds)}
          <div className="bg-base-content mx-3 h-6 w-0.5 rounded-full" />
          <Users className="shrink-0" />
          {recipe.servings} Porções
        </div>

        {fullRecipe?.sections.map((section) => (
          <SectionView key={section.id} section={section} />
        ))}

        <div className="border-primary relative border-2 p-2">
          <div className="heading bg-base absolute -top-6 -left-2 px-2 text-2xl">
            Notas
          </div>
          <div className="bg-primary/50 px-4 py-2">{recipe.notes}</div>
        </div>
      </div>
    </motion.div>
  );
}
