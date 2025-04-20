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
});
