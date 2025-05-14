"use client";

import { motion } from "framer-motion";
import {
  ChevronLeft,
  CookingPot,
  Hourglass,
  Pencil,
  Plus,
  Trash,
  Users,
} from "lucide-react";
import { api } from "~/trpc/react";
import NoImage from "~/app/_images/NoImage.png";
import { secondsToPrettyString } from "~/utils/time";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import SectionView from "~/app/_components/recipes/SectionView";
import { useRecipeContext } from "~/app/_contexts/RecipeContext";
import toast from "react-hot-toast";
import LoadingIndicator from "~/app/_components/layout/LoadingIndicator";

export default function RecipeView() {
  const router = useRouter();
  const pathname = usePathname();
  const recipeId = pathname.replace("/", "");
  const trpcUtils = api.useUtils();

  const { recipe: prefetched } = useRecipeContext();

  const { data: session } = useSession();
  const { data: fullRecipe } = api.recipe.getById.useQuery({ id: recipeId });
  const deleteMutation = api.recipe.delete.useMutation({
    onSuccess: async () => {
      await trpcUtils.recipe.list.invalidate();
      router.push("/");
    },
  });

  if (!prefetched && !fullRecipe) return <LoadingIndicator />;

  const recipe = fullRecipe ?? prefetched;

  return (
    <motion.div
      layoutId={recipe?.name + " card"}
      className="bg-base w-full shadow-lg"
    >
      <div className="flex flex-row gap-4 px-6 py-4">
        <button
          className="group flex cursor-pointer flex-row items-center font-serif italic"
          onClick={() => router.push("/")}
        >
          <ChevronLeft className="mr-4 transition-all group-hover:mr-2" />
          Voltar
        </button>
        {session?.user && (
          <>
            <button
              className="icon-btn ml-auto"
              onClick={() =>
                toast.promise(deleteMutation.mutateAsync({ id: recipeId }), {
                  loading: "A apagar...",
                  success: "Receita apagada!",
                  error: "Ocorreu um erro :(",
                })
              }
            >
              <Trash />
            </button>
            <button
              className="icon-btn"
              onClick={() => router.push(`/${recipeId}/edit`)}
            >
              <Pencil />
            </button>
          </>
        )}
      </div>

      <motion.div
        layoutId={recipe?.name + " image container"}
        className="relative flex h-64 w-full items-center overflow-hidden"
      >
        <motion.img
          layoutId={recipe?.name + " image"}
          src={recipe?.image ?? NoImage.src}
          alt={recipe?.name + " photo"}
          className="w-full"
        />
        <motion.div
          layoutId={recipe?.name + " gradient"}
          className="to-base absolute top-0 flex h-full w-full bg-linear-to-b from-0%"
        >
          <div className="heading mx-6 mt-auto text-4xl">{recipe?.name}</div>
        </motion.div>
      </motion.div>

      <div className="flex flex-col gap-8 px-6 pt-3 pb-6">
        <div className="flex flex-col gap-3">
          <div className="flex flex-row items-center gap-2">
            <CookingPot className="shrink-0" />
            {secondsToPrettyString(recipe?.prepSeconds ?? 0)}
            <Plus className="shrink-0" />
            <Hourglass className="shrink-0" />
            {secondsToPrettyString(recipe?.waitSeconds ?? 0)}
            <div className="bg-base-content mx-3 h-6 w-0.5 rounded-full" />
            <Users className="shrink-0" />
            {recipe?.servings} Porções
          </div>
          <div className="flex flex-wrap gap-2">
            {fullRecipe?.tags.map((tag) => (
              <div key={tag.id} className="bg-primary px-2 py-1">
                {tag.name}
              </div>
            ))}
          </div>
        </div>

        {fullRecipe?.sections.map((section) => (
          <SectionView key={section.id} section={section} />
        ))}

        {recipe?.notes && (
          <div className="border-primary relative mt-6 border-2 p-2">
            <div className="heading bg-base absolute -top-6 -left-2 px-2 text-2xl">
              Notas
            </div>
            <div className="bg-primary/50 px-4 py-2">{recipe?.notes}</div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
