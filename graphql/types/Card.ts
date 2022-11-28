import { objectType } from "nexus";
import { User } from "./User";

export const Card = objectType({
  name: "Card",
  definition(t) {
    t.string("id");
    t.string("code");
    t.string("cvv");
    t.field("user", {
      type: User,
      async resolve(parent, _args, ctx) {
        return await ctx.prisma.user
          .findUnique({
            where: {
              id: parent.id,
            },
          })
          .user();
      },
    });
  },
});
