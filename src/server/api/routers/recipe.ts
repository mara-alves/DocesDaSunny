import { z } from "zod";

import {
  createTRPCContext,
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

const sectionInput = z.object({
  name: z.string(),
  preparation: z.array(z.string()),
  ingredients: z.array(
    z.object({
      ingredient: z.object({
        id: z.string().nullish(),
        name: z.string(),
      }),
      quantity: z.string(),
    }),
  ),
});

const recipeInput = z.object({
  name: z.string(),
  image: z.string().nullish(),
  prepSeconds: z.number(),
  waitSeconds: z.number(),
  servings: z.number(),
  notes: z.string().nullish(),
  sections: z.array(sectionInput),
});

export const recipeRouter = createTRPCRouter({
  list: publicProcedure
    .input(z.object({ search: z.string() }))
    .query(async ({ input, ctx }) => {
      return ctx.db.recipe.findMany({
        where: {
          name: {
            contains: input.search,
            mode: "insensitive",
          },
        },
        orderBy: {
          createdAt: "asc",
        },
      });
    }),

  listAllIngredients: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.ingredient.findMany({
      orderBy: {
        name: "asc",
      },
    });
  }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      return ctx.db.recipe.findUnique({
        where: { id: input.id },
        include: {
          sections: {
            include: {
              ingredients: {
                select: {
                  quantity: true,
                  ingredient: {
                    select: {
                      id: true,
                      name: true,
                    },
                  },
                },
              },
            },
          },
        },
      });
    }),

  create: protectedProcedure
    .input(recipeInput)
    .mutation(async ({ input, ctx }) => {
      const { sections, ...recipeBaseData } = input;
      const { id: recipeId } = await ctx.db.recipe.create({
        data: recipeBaseData,
      });
      createSectionsWithIngredients(ctx, recipeId, sections);
      return;
    }),

  edit: protectedProcedure
    .input(z.object({ id: z.string(), data: recipeInput }))
    .mutation(async ({ input, ctx }) => {
      const { sections, ...recipeBaseData } = input.data;
      const { id: recipeId } = await ctx.db.recipe.update({
        where: {
          id: input.id,
        },
        data: recipeBaseData,
      });
      await ctx.db.section.deleteMany({ where: { recipeId: input.id } });
      createSectionsWithIngredients(ctx, recipeId, sections);
      return;
    }),
});

const createSectionsWithIngredients = async (
  ctx: Awaited<ReturnType<typeof createTRPCContext>>,
  recipeId: string,
  sections: z.infer<typeof sectionInput>[],
) => {
  for (const section of sections) {
    const { id: sectionId } = await ctx.db.section.create({
      data: {
        name: section.name,
        preparation: section.preparation,
        recipeId: recipeId,
      },
    });

    const sectionIngredients = [];
    for (const ingredient of section.ingredients) {
      let id = ingredient.ingredient.id;
      if (!id) {
        const res = await ctx.db.ingredient.create({
          data: {
            name: ingredient.ingredient.name,
          },
        });
        id = res.id;
      }
      sectionIngredients.push({
        sectionId,
        ingredientId: id,
        quantity: ingredient.quantity,
      });
    }
    await ctx.db.recipeIngredient.createMany({
      data: sectionIngredients,
    });
  }
};
