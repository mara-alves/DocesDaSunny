import type { Prisma, Tag } from "@prisma/client";
import { z } from "zod";
import {
  type createTRPCContext,
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

/* ---------------------------------- Types --------------------------------- */
export const orderOption = ["creation", "alphabetical"] as const;

const selectOption = z.object({
  id: z.string().nullish(),
  name: z.string(),
});

const ingredientInput = z.object({
  ingredient: selectOption,
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
  tags: z.array(selectOption),
});
export type FrontendRecipe = z.infer<typeof recipeInput>;

/* --------------------------------- Router --------------------------------- */

export const recipeRouter = createTRPCRouter({
  list: publicProcedure
    .input(
      z.object({
        cursor: z.string().nullish(),
        search: z.string(),
        orderBy: z.enum(orderOption),
        tagIds: z.array(z.string()),
        ingredientIds: z.array(z.string()),
      }),
    )
    .query(async ({ input, ctx }) => {
      const where: Prisma.RecipeWhereInput = {
        name: {
          contains: input.search,
          mode: "insensitive",
        },
        tags: {
          ...(input.tagIds.length <= 0
            ? {}
            : {
                some: {
                  id: {
                    in: input.tagIds,
                  },
                },
              }),
        },
        AND: input.ingredientIds.map((id) => ({
          sections: {
            some: {
              ingredients: {
                some: {
                  ingredientId: id,
                },
              },
            },
          },
        })),
      };

      let orderBy;
      if (input.orderBy === "creation")
        orderBy = { createdAt: "asc" as "asc" | "desc" };
      else orderBy = { name: "asc" as "asc" | "desc" };

      const limit = 20;
      const recipes = await ctx.db.recipe.findMany({
        take: limit + 1,
        cursor: input.cursor ? { id: input.cursor } : undefined,
        where,
        orderBy: orderBy,
      });

      let nextCursor: typeof input.cursor | undefined = undefined;
      if (recipes.length > limit) {
        const nextItem = recipes.pop();
        nextCursor = nextItem?.id;
      }

      const totalCount = await ctx.db.recipe.count({ where });

      return { recipes, nextCursor, totalCount };
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

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      return ctx.db.recipe.delete({ where: { id: input.id } });
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
