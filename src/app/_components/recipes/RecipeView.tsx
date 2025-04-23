import type { Recipe } from "@prisma/client";
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { api } from "~/trpc/react";
import NoImage from "~/app/_images/NoImage.png";

export default function RecipeView({
  recipe,
  goBack,
}: {
  recipe: Recipe;
  goBack: () => void;
}) {
  const { data: fullRecipe } = api.recipe.getById.useQuery({ id: recipe.id });

  return (
    <motion.div
      layoutId={recipe.name + " card"}
      className="bg-base absolute top-0 z-10 w-full shadow-lg"
    >
      <div className="p-4">
        <button
          className="flex flex-row items-center gap-2 font-serif italic"
          onClick={goBack}
        >
          <ChevronLeft /> Voltar
        </button>
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
          <div className="mx-6 mt-auto font-serif text-4xl font-semibold italic">
            {recipe?.name}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
