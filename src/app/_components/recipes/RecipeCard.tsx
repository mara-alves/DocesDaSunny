import type { Recipe } from "@prisma/client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useRecipeContext } from "~/app/_contexts/RecipeContext";
import NoImage from "~/app/_images/NoImage.png";

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  const router = useRouter();
  const { recipe: active, setRecipe } = useRecipeContext();

  return (
    <motion.div
      layoutId={(recipe.name ?? "new") + " card"}
      className={
        "bg-base flex h-fit cursor-pointer flex-col gap-4 p-4 shadow-lg " +
        (active?.id == recipe.id ? " z-10" : " z-0")
      }
      onClick={() => {
        setRecipe(recipe);
        router.push(`/${recipe.id}`);
      }}
    >
      <motion.div
        layoutId={recipe.name + " image container"}
        className="relative flex aspect-square w-full items-center overflow-hidden"
      >
        <motion.img
          layoutId={recipe.name + " image"}
          src={recipe.image ?? NoImage.src}
          alt={recipe.name + " photo"}
          className="min-h-full min-w-full object-cover"
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
