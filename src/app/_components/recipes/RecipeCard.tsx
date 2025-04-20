import type { Recipe } from "@prisma/client";
import Image from "next/image";

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <div className="bg-base flex h-fit flex-col gap-4 p-4 shadow-lg">
      {recipe.image ? (
        <Image
          src={recipe.image}
          alt={recipe.name + " photo"}
          layout={"responsive"}
          width={50}
          height={50}
          className="aspect-square w-full object-cover object-center"
        />
      ) : (
        <div className="bg-background flex aspect-square w-full items-center justify-center text-5xl font-semibold">
          ?
        </div>
      )}
      <div className="line-clamp-2 h-12 font-semibold">{recipe.name}</div>
    </div>
  );
}
