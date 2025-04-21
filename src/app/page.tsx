"use client";

import { api } from "~/trpc/react";
import Sidebar from "./_components/layout/Sidebar";
import RecipeCard from "./_components/recipes/RecipeCard";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import RecipeView from "./_components/recipes/RecipeView";

export default function Home() {
  const [search, setSearch] = useState("");
  const listRecipes = api.recipe.list.useQuery({ search });
  const [selectedRecipeId, setSelectedRecipeId] = useState<string | null>(null);

  return (
    <div className="flex h-full w-full flex-col gap-12 md:flex-row">
      <Sidebar
        search={search}
        setSearch={setSearch}
        resultsCount={listRecipes.data?.length ?? 0}
      />
      {selectedRecipeId ? (
        <RecipeView
          id={selectedRecipeId}
          goBack={() => setSelectedRecipeId(null)}
        />
      ) : (
        <div className="z-10 flex w-full flex-col gap-6 md:grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          <AnimatePresence>
            {listRecipes.data?.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                setRecipe={setSelectedRecipeId}
              />
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
