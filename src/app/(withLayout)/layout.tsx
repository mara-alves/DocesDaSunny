"use client";

import { useState } from "react";
import { api } from "~/trpc/react";
import Topbar from "../_components/layout/Topbar";
import Sidebar from "../_components/layout/Sidebar";
import { RecipeProvider } from "../_contexts/RecipeContext";

export default function SidebarLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [search, setSearch] = useState("");
  const listRecipes = api.recipe.list.useQuery({ search });

  return (
    <RecipeProvider>
      <div className="bg-background text-base-content h-screen w-screen overflow-x-hidden overflow-y-auto">
        <Topbar />
        <div className="mx-auto my-10 w-full px-6 md:px-12 xl:container">
          <div className="flex h-full w-full flex-col gap-12 md:flex-row">
            <Sidebar
              search={search}
              setSearch={setSearch}
              resultsCount={listRecipes.data?.length ?? 0}
            />

            <div className="relative flex w-full flex-col">{children}</div>
          </div>
        </div>
      </div>
    </RecipeProvider>
  );
}
