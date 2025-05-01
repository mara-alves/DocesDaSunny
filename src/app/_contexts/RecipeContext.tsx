"use client";

import type { Recipe } from "@prisma/client";
import { createContext, useContext, useState } from "react";

type RecipeContextType = {
  recipe: Recipe | null;
  setRecipe: (recipe: Recipe | null) => void;
};

const RecipeContext = createContext<RecipeContextType | null>(null);

export const useRecipeContext = () => {
  const ctx = useContext(RecipeContext);
  if (!ctx)
    throw new Error("useRecipeContext must be used within RecipeProvider");
  return ctx;
};

export const RecipeProvider = ({ children }: { children: React.ReactNode }) => {
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  return (
    <RecipeContext.Provider value={{ recipe, setRecipe }}>
      {children}
    </RecipeContext.Provider>
  );
};
