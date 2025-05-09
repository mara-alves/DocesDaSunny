"use client";

import { api } from "~/trpc/react";
import { LoaderCircle, Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import RecipeCard from "../_components/recipes/RecipeCard";
import { useRouter } from "next/navigation";
import { useRecipeContext } from "../_contexts/RecipeContext";
import { useEffect, useState } from "react";
import { useFiltersContext } from "../_contexts/FiltersContext";
import { useDebounce } from "@uidotdev/usehooks";

export default function Home() {
  const router = useRouter();
  const { data: session } = useSession();
  const { search, orderBy, setCount, tagsFilter, ingredientsFilter } =
    useFiltersContext();
  const { recipe: prefetched, setRecipe } = useRecipeContext();

  const debouncedSearchTerm = useDebounce(search, 200);
  const listRecipes = api.recipe.list.useQuery({
    search: debouncedSearchTerm,
    orderBy,
    tagIds: tagsFilter.map((e) => e.id),
    ingredientIds: ingredientsFilter.map((e) => e.id),
  });
  const [deferredResult, setDeferredResult] = useState(listRecipes.data);

  useEffect(() => {
    const result = listRecipes.data;
    if (result) {
      setCount(result.length);
      setDeferredResult(result);
    }
  }, [listRecipes.data, setCount]);

  if (!deferredResult) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center font-semibold">
        <LoaderCircle className="animate-spin" size={50} />A carregar...
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-6 md:grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
      {session?.user && (
        <motion.div
          layoutId={"new card"}
          onClick={() => {
            setRecipe(null);
            router.push("/new");
          }}
          className={
            "bg-base flex w-full cursor-pointer flex-col items-center justify-center gap-4 p-4 font-semibold shadow-lg" +
            (!prefetched ? " z-10" : " z-0")
          }
        >
          <div className="flex aspect-square w-full flex-col items-center justify-center">
            <Plus className="mt-12 size-16" />
            Adicionar Receita
          </div>
          <div className="h-12" />
        </motion.div>
      )}

      {deferredResult?.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
}
