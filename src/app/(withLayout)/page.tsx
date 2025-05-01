"use client";

import { api } from "~/trpc/react";
import { useState } from "react";
import { LoaderCircle, Plus } from "lucide-react";
import { useSession } from "next-auth/react";

import { motion } from "framer-motion";
import RecipeCard from "../_components/recipes/RecipeCard";
import { redirect } from "next/navigation";
import { useRecipeContext } from "../_contexts/RecipeContext";

export default function Home() {
  const { data: session } = useSession();
  const [search, setSearch] = useState("");
  const listRecipes = api.recipe.list.useQuery({ search });

  const { recipe: prefetched, setRecipe } = useRecipeContext();

  if (listRecipes.isLoading) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center font-semibold">
        <LoaderCircle className="animate-spin" size={50} />A carregar...
      </div>
    );
  }

  return (
    <div className="z-10 flex w-full flex-col gap-6 md:grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
      {session?.user && (
        <motion.div
          layoutId={"new card"}
          onClick={() => {
            setRecipe(null);
            redirect("/new");
          }}
          className={
            "bg-base flex w-full cursor-pointer flex-col items-center justify-center p-4 font-semibold shadow-lg" +
            (!prefetched ? " z-10" : " z-0")
          }
        >
          <Plus className="size-16" />
          Adicionar Receita
        </motion.div>
      )}

      {listRecipes.data?.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
}
