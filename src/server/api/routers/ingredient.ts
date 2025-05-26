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
