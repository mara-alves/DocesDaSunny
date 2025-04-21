import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import { api } from "~/trpc/react";

export default function RecipeView({
  id,
  goBack,
}: {
  id: string;
  goBack: () => void;
}) {
  const { data: recipe } = api.recipe.getById.useQuery({ id });

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{ duration: 0.6, type: "spring" }}
      className="bg-base w-full shadow-lg"
    >
      <div className="p-4">
        <button
          className="flex flex-row items-center gap-2 font-serif italic"
          onClick={goBack}
        >
          <ChevronLeft /> Voltar
        </button>
      </div>
      <div className="relative h-64">
        {recipe?.image ? (
          <Image
            src={recipe.image}
            alt={recipe.name + " photo"}
            layout={"responsive"}
            width={50}
            height={50}
            className="max-h-64 w-full object-cover object-center"
          />
        ) : (
          <div className="bg-background flex h-64 w-full items-center justify-center text-5xl font-semibold">
            ?
          </div>
        )}
        <div className="to-base absolute top-0 h-full w-full bg-linear-to-b from-0%"></div>
        <div className="px-6 pb-4">
          <div className="font-serif text-4xl font-semibold italic">
            {recipe?.name}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
