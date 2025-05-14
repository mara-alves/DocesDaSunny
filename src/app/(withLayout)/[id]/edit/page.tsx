"use client";

import { usePathname } from "next/navigation";
import LoadingIndicator from "~/app/_components/layout/LoadingIndicator";
import EditableRecipe from "~/app/_components/recipes/editMode/EditableRecipe";
import { api } from "~/trpc/react";

export default function EditRecipe() {
  const pathname = usePathname();
  const recipeId = pathname.split("/")[1] ?? "";

  const { data: recipe } = api.recipe.getById.useQuery({ id: recipeId });

  if (!recipe) return <LoadingIndicator />;

  return (
    <div className="bg-base w-full shadow-lg">
      <EditableRecipe recipe={recipe} />
    </div>
  );
}
