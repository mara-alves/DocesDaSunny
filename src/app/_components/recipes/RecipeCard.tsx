import type { Recipe } from "@prisma/client";
import { motion } from "framer-motion";
import NoImage from "~/app/_images/NoImage.png";

export default function RecipeCard({
  recipe,
  setRecipe,
  selectedRecipeId,
  isListVisible,
}: {
  recipe: Recipe;
  setRecipe: (id: Recipe) => void;
  selectedRecipeId?: string;
  isListVisible?: boolean;
}) {
  return (
    <motion.div
      layoutId={(recipe.name ?? "new") + " card"}
      style={{
        transition:
          selectedRecipeId === recipe.id ? "none" : "opacity 0.5s ease",
        opacity: isListVisible || selectedRecipeId == recipe.id ? 1 : 0,
      }}
      className={
        "bg-base flex h-fit cursor-pointer flex-col gap-4 p-4 shadow-lg " +
        (selectedRecipeId == recipe.id ? " z-10" : " z-0")
      }
      onClick={() => setRecipe(recipe)}
    >
      <motion.div
        layoutId={recipe.name + " image container"}
        className="relative flex aspect-square w-full items-center overflow-hidden"
      >
        <motion.img
          layoutId={recipe.name + " image"}
          src={recipe.image ?? NoImage.src}
          alt={recipe.name + " photo"}
          className="w-full"
        />
        <motion.div
          layoutId={recipe.name + " gradient"}
          transition={{ duration: 0.5 }}
          className="to-base absolute top-full flex h-full w-full bg-linear-to-b from-0%"
        ></motion.div>
      </motion.div>
      <div className="line-clamp-2 h-12 font-semibold">{recipe.name}</div>
    </motion.div>
  );
}
