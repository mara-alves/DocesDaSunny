import type { Tag } from "@prisma/client";
import { z } from "zod";
import {
  type createTRPCContext,
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

/* ---------------------------------- Types --------------------------------- */
export const orderOption = ["creation", "alphabetical"] as const;

const ingredientInput = z.object({
  ingredient: z.object({
    id: z.string().nullish(),
    name: z.string(),
  }),
  quantity: z.string(),
});
export type FrontendSectionIngredient = z.infer<typeof ingredientInput>;

const sectionInput = z.object({
  name: z.string(),
  preparation: z.array(z.string()),
  ingredients: z.array(ingredientInput),
});
export type FrontendSection = z.infer<typeof sectionInput>;

const recipeInput = z.object({
  name: z.string(),
  image: z.string().nullish(),
  prepSeconds: z.number(),
  waitSeconds: z.number(),
  servings: z.number(),
  notes: z.string().nullish(),
  sections: z.array(sectionInput),
  tags: z.array(
    z.object({
      id: z.string().nullish(),
      name: z.string(),
    }),
  ),
});
export type FrontendRecipe = z.infer<typeof recipeInput>;

/* --------------------------------- Router --------------------------------- */

export const recipeRouter = createTRPCRouter({
  list: publicProcedure
    .input(
      z.object({
        search: z.string(),
        orderBy: z.enum(orderOption),
      }),
    )
    .query(async ({ input, ctx }) => {
      let orderBy;
      if (input.orderBy === "creation")
        orderBy = { createdAt: "asc" as "asc" | "desc" };
      else if (input.orderBy === "alphabetical")
        orderBy = { name: "asc" as "asc" | "desc" };
      else orderBy = { name: "asc" as "asc" | "desc" };

      return ctx.db.recipe.findMany({
        where: {
          name: {
            contains: input.search,
            mode: "insensitive",
          },
        },
        orderBy: orderBy,
      });
    }),

  listTags: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.tag.findMany({ orderBy: { name: "asc" } });
  }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      return ctx.db.recipe.findUnique({
        where: { id: input.id },
        include: {
          tags: true,
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
      const { sections, tags, ...recipeBaseData } = input;
      const { id: recipeId } = await ctx.db.recipe.create({
        data: {
          ...recipeBaseData,
          tags: {
            connect: tags.filter((e) => !!e.id) as Tag[],
          },
        },
      });
      await createSectionsWithIngredients(ctx, recipeId, sections);
      return;
    }),

  edit: protectedProcedure
    .input(z.object({ id: z.string(), data: recipeInput }))
    .mutation(async ({ input, ctx }) => {
      const { sections, tags, ...recipeBaseData } = input.data;
      const { id: recipeId } = await ctx.db.recipe.update({
        where: {
          id: input.id,
        },
        data: {
          ...recipeBaseData,
          tags: {
            connect: tags.filter((e) => !!e.id) as Tag[],
          },
        },
      });
      await ctx.db.section.deleteMany({ where: { recipeId: input.id } });
      await createSectionsWithIngredients(ctx, recipeId, sections);
      return;
    }),

  createTag: protectedProcedure
    .input(z.object({ name: z.string() }))
    .mutation(({ input, ctx }) => {
      return ctx.db.tag.create({ data: { ...input } });
    }),
});

const createSectionsWithIngredients = async (
  ctx: Awaited<ReturnType<typeof createTRPCContext>>,
  recipeId: string,
  sections: FrontendSection[],
) => {
  for (const section of sections) {
    await ctx.db.section.create({
      data: {
        name: section.name,
        preparation: section.preparation,
        recipeId: recipeId,
        ingredients: {
          createMany: {
            data: section.ingredients
              .filter((e) => !!e.ingredient.id)
              .map((e) => ({
                ingredientId: e.ingredient.id!,
                quantity: e.quantity,
              })),
          },
        },
      },
    });
  }
};
