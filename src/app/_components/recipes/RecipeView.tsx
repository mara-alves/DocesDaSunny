import type { Recipe } from "@prisma/client";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ImageOff } from "lucide-react";
import { api } from "~/trpc/react";
import NoImage from "~/app/_images/NoImage.png";

export default function RecipeView({
  recipe,
  goBack,
  onTransitionEnd,
}: {
  recipe: Recipe;
  goBack: () => void;
  onTransitionEnd: () => void;
}) {
  const { data: fullRecipe } = api.recipe.getById.useQuery({ id: recipe.id });

  return (
    <motion.div
      layoutId={recipe.name + " card"}
      className="bg-base relative z-50 w-full shadow-lg"
      onTransitionEnd={onTransitionEnd}
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
        layoutId={recipe.name + " frame"}
        className="relative flex h-64 items-center overflow-hidden"
      >
        <motion.img
          layoutId={recipe.name + " photo"}
          src={recipe.image ?? NoImage.src}
          alt={recipe.name + " photo"}
          className="aspect-square w-full object-cover object-center"
        />

        <motion.div
          layoutId="gradient"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.6 }}
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
