"use client";

import { api } from "~/trpc/react";
import Sidebar from "./_components/layout/Sidebar";
import RecipeCard from "./_components/recipes/RecipeCard";
import { useState } from "react";
import RecipeView from "./_components/recipes/RecipeView";
import type { Recipe } from "@prisma/client";
import { Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import EditableRecipe, {
  type FrontendRecipe,
} from "./_components/recipes/editMode/EditableRecipe";
import { motion } from "framer-motion";

export default function Home() {
  const { data: session } = useSession();

  const [search, setSearch] = useState("");
  const listRecipes = api.recipe.list.useQuery({ search });

  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [toEdit, setToEdit] = useState<FrontendRecipe | null>(null);

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
            <motion.div
              layoutId={"new card"}
              onClick={() => {
                setSelectedRecipe(null);
                setOpen(true);
              }}
              style={{
                transition: !selectedRecipe ? "none" : "opacity 0.5s ease",
                opacity: !open || (open && !selectedRecipe) ? 1 : 0,
              }}
              className={
                "bg-base z-0 flex cursor-pointer flex-col items-center justify-center p-8 text-center font-semibold shadow-lg" +
                (!selectedRecipe ? " z-10" : " z-0")
              }
            >
              <Plus className="size-16" />
              Adicionar Receita
            </motion.div>
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
        {toEdit ? (
          <EditableRecipe
            recipe={toEdit}
            goBack={async () => {
              await listRecipes.refetch();
              setToEdit(null);
            }}
          />
        ) : (
          open &&
          (selectedRecipe ? (
            <RecipeView
              recipe={selectedRecipe}
              goBack={() => setOpen(false)}
              edit={(e) => setToEdit(e)}
            />
          ) : (
            <EditableRecipe
              goBack={async () => {
                await listRecipes.refetch();
                setOpen(false);
              }}
            />
          ))
        )}
      </div>
    </div>
  );
}
