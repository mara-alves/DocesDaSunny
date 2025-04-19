"use client";

import { api } from "~/trpc/react";
import Sidebar from "./_components/layout/Sidebar";
import RecipeCard from "./_components/recipes/RecipeCard";

export default function Home() {
  const listRecipes = api.recipe.list.useQuery({ search: "" });
  console.log(listRecipes.data);

  return (
    <div className="flex h-full w-full flex-col gap-12 md:flex-row">
      <Sidebar />
      <div className="z-10 flex w-full flex-col gap-6 md:grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {listRecipes.data?.map((recipe) => <RecipeCard key={recipe.id} />)}
        <div className="bg-base h-96">Receita 1</div>
        <div className="bg-base h-96">Receita 2</div>
        <div className="bg-base h-96">Receita 3</div>
        <div className="bg-base h-96">Receita 4</div>
        <div className="bg-base h-96">Receita 5</div>
        <div className="bg-base h-96">Receita 6</div>
        <div className="bg-base h-96">Receita 1</div>
        <div className="bg-base h-96">Receita 2</div>
        <div className="bg-base h-96">Receita 3</div>
      </div>
    </div>
  );
}
