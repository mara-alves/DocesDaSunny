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
      initial={{ opacity: active?.id === recipe.id ? 1 : 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: active?.id === recipe.id ? 1 : 0 }}
      className={
        "bg-base flex h-fit cursor-pointer flex-col gap-3 p-4 shadow-sm transition-shadow hover:shadow-lg" +
        (active?.id === recipe.id ? " z-10" : " z-0")
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
      </motion.div>
      <motion.div
        layoutId={recipe.name + " gradient"}
        className="to-base w-full bg-linear-to-b from-0%"
      >
        <motion.div
          layoutId={recipe?.name + " name"}
          className="heading line-clamp-2 h-12"
        >
          {recipe.name}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
