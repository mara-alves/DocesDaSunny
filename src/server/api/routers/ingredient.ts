import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const ingredientRouter = createTRPCRouter({
  list: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.ingredient.findMany({
      orderBy: {
        name: "asc",
      },
    });
  }),

  create: protectedProcedure
    .input(z.object({ name: z.string().min(3) }))
    .mutation(async ({ input, ctx }) => {
      await ctx.db.ingredient.create({
        data: {
          name: input.name,
        },
      });
    }),
});
