"use client";

import { createContext, useContext, useState } from "react";

type FiltersContextType = {
  search: string;
  setSearch: (value: string) => void;
  count?: number;
  setCount: (value?: number) => void;
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
  const [count, setCount] = useState<number>();

  return (
    <FiltersContext.Provider value={{ search, setSearch, count, setCount }}>
      {children}
    </FiltersContext.Provider>
  );
};
