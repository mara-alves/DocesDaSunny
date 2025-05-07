"use client";

import type { Ingredient, Tag } from "@prisma/client";
import { createContext, useContext, useState } from "react";
import type { orderOption } from "~/server/api/routers/recipe";

export type OrderOption = (typeof orderOption)[number];

type FiltersContextType = {
  search: string;
  setSearch: (value: string) => void;
  orderBy: OrderOption;
  setOrderBy: (value: OrderOption) => void;
  count?: number;
  setCount: (value?: number) => void;
  tagsFilter: Tag[];
  setTagsFilter: (value: Tag[]) => void;
  ingredientsFilter: Ingredient[];
  setIngredientsFilter: (value: Ingredient[]) => void;
};

const FiltersContext = createContext<FiltersContextType | null>(null);

export const useFiltersContext = () => {
  const ctx = useContext(FiltersContext);
  if (!ctx)
    throw new Error("useFiltersContext must be used within FiltersProvider");
  return ctx;
};

export const FiltersProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [search, setSearch] = useState<string>("");
  const [orderBy, setOrderBy] = useState<OrderOption>("creation");
  const [count, setCount] = useState<number>();
  const [tagsFilter, setTagsFilter] = useState<Tag[]>([]);
  const [ingredientsFilter, setIngredientsFilter] = useState<Ingredient[]>([]);

  return (
    <FiltersContext.Provider
      value={{
        search,
        setSearch,
        orderBy,
        setOrderBy,
        count,
        setCount,
        tagsFilter,
        setTagsFilter,
        ingredientsFilter,
        setIngredientsFilter,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
};
