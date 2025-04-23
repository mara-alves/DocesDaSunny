"use client";

import { api } from "~/trpc/react";
import Sidebar from "./_components/layout/Sidebar";
import RecipeCard from "./_components/recipes/RecipeCard";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import RecipeView from "./_components/recipes/RecipeView";
import type { Recipe } from "@prisma/client";
import EditableRecipe from "./_components/recipes/EditableRecipe";
import { Plus } from "lucide-react";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  const [search, setSearch] = useState("");
  const listRecipes = api.recipe.list.useQuery({ search });

  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="flex h-full w-full flex-col gap-12 md:flex-row">
      <Sidebar
        search={search}
        setSearch={setSearch}
        resultsCount={listRecipes.data?.length ?? 0}
      />
      <div className="relative flex flex-col">
        <div
          className={
            "z-10 flex w-full flex-col gap-6 md:grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 " +
            (open ? "pointer-events-none" : "")
          }
        >
          {session?.user && (
            <div
              onClick={() => {
                setSelectedRecipe(null);
                setOpen(true);
              }}
              className={
                "bg-primary border-base-content flex cursor-pointer flex-col items-center justify-center border-2 p-8 font-semibold transition " +
                (open ? "opacity-0" : "opacity-100")
              }
            >
              <Plus className="size-16" />
              Adicionar Receita
            </div>
          )}
          {listRecipes.data?.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              setRecipe={(e) => {
                setSelectedRecipe(e);
                setOpen(true);
              }}
              selectedRecipeId={selectedRecipe?.id}
              isListVisible={!open}
            />
          ))}
        </div>
        {open &&
          (selectedRecipe ? (
            <RecipeView recipe={selectedRecipe} goBack={() => setOpen(false)} />
          ) : (
            <EditableRecipe goBack={() => setOpen(false)} />
          ))}
      </div>
    </div>
  );
}
