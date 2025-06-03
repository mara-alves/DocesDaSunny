"use client";

import Topbar from "../_components/layout/Topbar";
import Sidebar from "../_components/layout/Sidebar";
import { RecipeProvider } from "../_contexts/RecipeContext";
import { FiltersProvider } from "../_contexts/FiltersContext";
import { Toaster } from "react-hot-toast";

export default function SidebarLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <RecipeProvider>
      <FiltersProvider>
        <div className="bg-background text-base-content flex h-screen w-screen flex-col overflow-x-hidden md:overflow-y-scroll">
          <Topbar />
          <div className="mx-auto my-14 w-full px-6 md:px-12 xl:container">
            <div className="flex h-full w-full flex-col gap-12 md:flex-row">
              <Sidebar />
              <div className="relative z-10 flex w-full flex-col">
                {children}
              </div>
            </div>
          </div>
          <div className="mt-auto mb-8 text-center font-serif italic">
            Made with <span className="not-italic">&#x2764;</span> by{" "}
            <a href="https://github.com/mara-alves" className="underline">
              Sunny&apos;s Sister
            </a>
          </div>
          <Toaster
            toastOptions={{
              style: {
                background: "var(--color-base)",
                boxShadow: "var(--shadow-lg)",
                color: "var(--color-base-content)",
                borderRadius: "0",
                border: "2px solid var(--color-base-content)",
              },
              iconTheme: {
                primary: "var(--color-base-content)",
                secondary: "var(--color-base)",
              },
            }}
          />
        </div>
      </FiltersProvider>
    </RecipeProvider>
  );
}
