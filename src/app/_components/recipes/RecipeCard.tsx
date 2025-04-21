import type { Recipe } from "@prisma/client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function RecipeCard({
  recipe,
  setRecipe,
}: {
  recipe: Recipe;
  setRecipe: (id: string) => void;
}) {
  return (
    <motion.div
      className="bg-base flex h-fit flex-col gap-4 p-4 shadow-lg"
      key={recipe.id}
      layout
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{ duration: 0.6, type: "spring" }}
      onClick={() => setRecipe(recipe.id)}
    >
      {recipe.image ? (
        <Image
          src={recipe.image}
          alt={recipe.name + " photo"}
          layout={"responsive"}
          width={50}
          height={50}
          className="aspect-square w-full object-cover object-center"
        />
      ) : (
        <div className="bg-background flex aspect-square w-full items-center justify-center text-5xl font-semibold">
          ?
        </div>
      )}
      <div className="line-clamp-2 h-12 font-semibold">{recipe.name}</div>
    </motion.div>
  );
}
