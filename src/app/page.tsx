"use client";

import Sidebar from "./_components/layout/Sidebar";

export default function Home() {
  return (
    <div className="flex h-full w-full flex-col gap-8 md:flex-row">
      <Sidebar />
      <div className="flex w-full grid-cols-3 flex-col gap-8 md:grid">
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
