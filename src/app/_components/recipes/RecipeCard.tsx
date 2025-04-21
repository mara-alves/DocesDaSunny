import type { Recipe } from "@prisma/client";
import { motion } from "framer-motion";
import NoImage from "~/app/_images/NoImage.png";

export default function RecipeCard({
  recipe,
  setRecipe,
}: {
  recipe: Recipe;
  setRecipe: (id: Recipe) => void;
}) {
  return (
    <motion.div
      layoutId={recipe.name + " card"}
      className="bg-base flex h-fit cursor-pointer flex-col gap-4 p-4 shadow-lg transition-shadow hover:shadow-2xl"
      onClick={() => setRecipe(recipe)}
    >
      <motion.div
        layoutId={recipe.name + " frame"}
        className="relative flex aspect-square w-full items-center overflow-hidden"
      >
        <motion.img
          layoutId={recipe.name + " photo"}
          src={recipe.image ?? NoImage.src}
          alt={recipe.name + " photo"}
          className="aspect-square w-full object-cover object-center"
        />
      </motion.div>
      <div className="font-semibold">{recipe.name}</div>
    </motion.div>
  );
}
