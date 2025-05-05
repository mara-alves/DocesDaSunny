"use client";

import Topbar from "../_components/layout/Topbar";
import Sidebar from "../_components/layout/Sidebar";
import { RecipeProvider } from "../_contexts/RecipeContext";
import { FiltersProvider } from "../_contexts/FiltersContext";

export default function SidebarLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <RecipeProvider>
      <FiltersProvider>
        <div className="bg-background text-base-content flex h-screen w-screen flex-col overflow-x-hidden overflow-y-scroll">
          <Topbar />
          <div className="mx-auto my-10 w-full px-6 md:px-12 xl:container">
            <div className="flex h-full w-full flex-col gap-12 md:flex-row">
              <Sidebar />
              <div className="relative z-10 flex w-full flex-col">
                {children}
              </div>
            </div>
          </div>
          <div className="mt-auto mb-8 text-center font-serif italic">
            Made with <span className="not-italic">❤</span> by{" "}
            <a href="https://github.com/mara-alves" className="underline">
              Sunny's Sister
            </a>
          </div>
        </div>
      </FiltersProvider>
    </RecipeProvider>
  );
}
