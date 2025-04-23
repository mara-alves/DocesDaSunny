import type { Recipe } from "@prisma/client";
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { api } from "~/trpc/react";
import NoImage from "~/app/_images/NoImage.png";

const EmptyRecipe: Partial<Recipe> = {
  name: "",
};

export default function EditableRecipe({
  recipe = EmptyRecipe,
  goBack,
}: {
  recipe?: Partial<Recipe>;
  goBack: () => void;
}) {
  return (
    <div className="bg-base relative z-50 w-full shadow-lg">
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
      </motion.div>
    </div>
  );
}
