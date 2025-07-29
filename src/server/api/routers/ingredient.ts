import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const ingredientRouter = createTRPCRouter({
  list: publicProcedure
    .input(z.object({ search: z.string() }).nullish())
    .query(async ({ input, ctx }) => {
      return ctx.db.ingredient.findMany({
        where: {
          ...(input
            ? { name: { contains: input.search, mode: "insensitive" } }
            : {}),
        },
        include: {
          _count: {
            select: {
              recipeIngredients: true,
            },
          },
        },
        orderBy: {
          name: "asc",
        },
      });
    }),

  // unlike list which shows all if no match and searches on whole string (contains),
  // this is more restrictive -> only display matches, and startsWith
  restrictedList: protectedProcedure
    .input(z.object({ search: z.string() }).nullish())
    .query(async ({ input, ctx }) => {
      if (!input?.search) return [];
      return ctx.db.ingredient.findMany({
        where: {
          ...(input
            ? { name: { startsWith: input.search, mode: "insensitive" } }
            : {}),
        },
        include: {
          _count: {
            select: {
              recipeIngredients: true,
            },
          },
        },
        orderBy: {
          name: "asc",
        },
      });
    }),

  create: protectedProcedure
    .input(z.object({ name: z.string().min(3) }))
    .mutation(async ({ input, ctx }) => {
      return await ctx.db.ingredient.create({
        data: {
          name: input.name,
        },
      });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      return await ctx.db.ingredient.delete({
        where: {
          id: input.id,
        },
      });
    }),

  edit: protectedProcedure
    .input(z.object({ id: z.string(), name: z.string() }))
    .mutation(async ({ input, ctx }) => {
      return await ctx.db.ingredient.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
        },
      });
    }),
});
