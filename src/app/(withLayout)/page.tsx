"use client";

import { api, type RouterOutputs } from "~/trpc/react";
import { Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import RecipeCard from "../_components/recipes/RecipeCard";
import { useRouter } from "next/navigation";
import { useRecipeContext } from "../_contexts/RecipeContext";
import { useCallback, useEffect, useRef, useState } from "react";
import { useFiltersContext } from "../_contexts/FiltersContext";
import { useDebounce } from "@uidotdev/usehooks";
import LoadingIndicator from "../_components/layout/LoadingIndicator";

export default function Home() {
  const router = useRouter();
  const { data: session } = useSession();
  const { search, orderBy, setCount, tagsFilter, ingredientsFilter } =
    useFiltersContext();
  const { recipe: prefetched, setRecipe } = useRecipeContext();

  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const debouncedSearchTerm = useDebounce(search, 400);
  const listRecipes = api.recipe.list.useInfiniteQuery(
    {
      search: debouncedSearchTerm,
      orderBy,
      tagIds: tagsFilter.map((e) => e.id),
      ingredientIds: ingredientsFilter.map((e) => e.id),
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    },
  );
  const [deferredResult, setDeferredResult] =
    useState<RouterOutputs["recipe"]["list"]["recipes"]>();

  const loadNext = useCallback(async () => {
    if (!listRecipes.isFetchingNextPage && listRecipes.hasNextPage) {
      await listRecipes.fetchNextPage();
    }
  }, [listRecipes]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) void loadNext();
      },
      { threshold: 0.5 },
    );
    const currentRef = loadMoreRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [loadMoreRef, loadNext]);

  useEffect(() => {
    const res = listRecipes.data;
    if (!res) return;
    setCount(res.pages[0]?.totalCount);
    setDeferredResult(res.pages.flatMap((page) => page.recipes));
  }, [listRecipes.data, setCount]);

  if (!deferredResult) return <LoadingIndicator />;

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
      {listRecipes.hasNextPage && <LoadingIndicator ref={loadMoreRef} />}
    </div>
  );
}
