import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

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
      return ctx.db.recipe.findUnique({ where: { id: input.id } });
    }),

  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        image: z.string().nullish(),
        prepSeconds: z.number(),
        waitSeconds: z.number(),
        servings: z.number(),
        notes: z.string().nullish(),
        sections: z.array(
          z.object({
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
          }),
        ),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { sections, ...recipeBaseData } = input;
      const { id: recipeId } = await ctx.db.recipe.create({
        data: recipeBaseData,
      });

      for (let section of sections) {
        const { id: sectionId } = await ctx.db.section.create({
          data: {
            name: section.name,
            preparation: section.preparation,
            recipeId: recipeId,
          },
        });

        const sectionIngredients = [];
        for (let ingredient of section.ingredients) {
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

      return;
    }),
});
