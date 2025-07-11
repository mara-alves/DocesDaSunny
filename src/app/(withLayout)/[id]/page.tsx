"use client";

import { motion } from "framer-motion";
import {
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
import TopPageNavigation from "~/app/_components/layout/TopPageNavigation";
import { useEffect, useState } from "react";
import InputNumber from "~/app/_components/inputs/InputNumber";

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

  const [servings, setServings] = useState<number>(0);
  useEffect(() => {
    if (fullRecipe) setServings(fullRecipe.servings);
  }, [fullRecipe]);

  if (!prefetched && !fullRecipe) return <LoadingIndicator />;

  const recipe = fullRecipe ?? prefetched;

  return (
    <motion.div
      layoutId={recipe?.name + " card"}
      className="bg-base relative w-full shadow-lg"
    >
      <TopPageNavigation
        extraActions={
          <>
            {session?.user && (
              <>
                <button
                  className="icon-btn ml-auto"
                  onClick={() =>
                    toast.promise(
                      deleteMutation.mutateAsync({
                        id: recipeId,
                        imgUrlToDel: recipe?.image,
                      }),
                      {
                        loading: "A apagar...",
                        success: "Receita apagada!",
                        error: "Ocorreu um erro :(",
                      },
                    )
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
          </>
        }
      />

      <motion.div
        layoutId={recipe?.name + " image container"}
        className="flex h-64 w-full items-center overflow-hidden"
      >
        <motion.img
          layoutId={recipe?.name + " image"}
          src={recipe?.image ?? NoImage.src}
          alt={recipe?.name + " photo"}
          className="w-full"
        />
      </motion.div>
      <motion.div
        layoutId={recipe?.name + " gradient"}
        className="to-base absolute top-14 flex h-64 w-full bg-linear-to-b from-0%"
      >
        <motion.div
          layoutId={recipe?.name + " name"}
          className="heading mx-6 mt-auto text-4xl"
        >
          {recipe?.name}
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
            <InputNumber
              value={servings}
              setValue={setServings}
              style="border-b w-10 outline-none"
            />
            Porções
          </div>
          <div className="flex flex-wrap gap-2">
            {fullRecipe?.tags.map((tag) => (
              <div key={tag.id} className="bg-primary px-2 py-1 shadow-sm">
                {tag.name}
              </div>
            ))}
          </div>
        </div>

        {fullRecipe?.sections.map((section) => (
          <SectionView
            key={section.id}
            section={section}
            servingsOriginal={fullRecipe.servings}
            servingsSelected={servings}
          />
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
