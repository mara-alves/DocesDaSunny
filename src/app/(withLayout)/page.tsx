import { api } from "~/trpc/server";
import HomeClient from "./HomeClient";

export default async function Home() {
  void api.recipe.list.prefetchInfinite(
    { search: "", orderBy: "creation", tagIds: [], ingredientIds: [] },
    { initialCursor: undefined },
  );

  return <HomeClient />;
}
