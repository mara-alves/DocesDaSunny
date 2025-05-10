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

  const [page, setPage] = useState(0);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const debouncedSearchTerm = useDebounce(search, 200);
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
  const [deferredResult, setDeferredResult] = useState<
    RouterOutputs["recipe"]["list"]["recipes"]
  >([]);

  const loadNext = useCallback(async () => {
    if (!listRecipes.isFetchingNextPage && listRecipes.hasNextPage) {
      await listRecipes.fetchNextPage();
      setPage((prev) => prev + 1);
    }
  }, [listRecipes]);

  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();
    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          void loadNext();
        }
      },
      { threshold: 1.0 },
    );
    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }
    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [loadNext]);

  useEffect(() => {
    const result = listRecipes.data?.pages[page]?.recipes ?? [];
    if (result) {
      setCount(result.length);
      setDeferredResult((prev) => prev.concat(result));
    }
  }, [listRecipes.data, page, setCount]);

  if (listRecipes.isLoading) return <LoadingIndicator />;

  // TODO: FIX RESULTS COUNT

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
