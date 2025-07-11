import { useMemo } from "react";
import type { RouterOutputs } from "~/trpc/react";

export default function SectionView({
  section,
  servingsOriginal,
  servingsSelected,
}: {
  section: NonNullable<RouterOutputs["recipe"]["getById"]>["sections"][number];
  servingsOriginal: number;
  servingsSelected: number;
}) {
  const calculatedIngredients = useMemo(() => {
    return section.ingredients.map((ing) => {
      const numberParts = (ing.quantity.match(/\d+/g) ?? []) as number[];
      let newQuantityStr = ing.quantity;

      for (const numPart of numberParts) {
        let calculated = (numPart * servingsSelected) / servingsOriginal;
        calculated = Math.round(calculated * 100) / 100;

        newQuantityStr = newQuantityStr.replace(
          numPart.toString(),
          calculated.toString(),
        );
      }
      return { ...ing, quantity: newQuantityStr };
    });
  }, [section.ingredients, servingsOriginal, servingsSelected]);

  return (
    <div className="flex flex-col gap-3">
      {section.name && (
        <div className="flex w-full flex-row items-center gap-2">
          <div className="heading text-2xl">{section.name}</div>
          <div className="bg-primary h-0.5 w-full" />
        </div>
      )}

      <div className="flex grid-cols-[0.5fr_1fr] flex-col gap-4 md:grid md:gap-8">
        {calculatedIngredients.length > 0 ? (
          <div className="border-base-content flex h-fit flex-col gap-2 border-2 border-dashed px-4 py-3">
            <div className="heading text-xl">Ingredientes</div>
            {calculatedIngredients.map((item, idx) => (
              <div key={idx}>
                <div className="bg-base-content mr-3 inline-block size-2 shrink-0 rounded-full" />
                {item.quantity.trim()}
                {item.quantity ? " " : ""}
                {item.ingredient.name}
              </div>
            ))}
          </div>
        ) : (
          <div className="hidden md:block"></div>
        )}

        {section.preparation.length > 0 ? (
          <div className="flex flex-col gap-2">
            <div className="heading text-xl">Preparação</div>
            {section.preparation.map((step, idx) => (
              <div key={idx} className="flex flex-row items-start gap-3">
                <p className="heading text-xl">{idx + 1}.</p>
                {step}
              </div>
            ))}
          </div>
        ) : (
          <div className="hidden md:block"></div>
        )}
      </div>
    </div>
  );
}
