import { objectType, extendType, nonNull, stringArg } from "nexus";
import { Card } from "./Card";

export const User = objectType({
  name: "User",
  definition(t) {
    t.string("id");
    t.string("username");
    t.string("email");
    t.string("password");
    t.field("card", {
      type: Card,
      async resolve(parent, _args, ctx) {
        return await ctx.prisma.card
          .findUnique({
            where: {
              id: parent.id,
            },
          })
          .card();
      },
    });
  },
});

export const CreateUser = extendType({
  type: "Mutation",
  definition(t) {
    t.field("createUser", {
      type: User,
      args: {
        username: nonNull(stringArg()),
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      async resolve(_root, args, ctx) {
        const user = await ctx.prisma.user.create({
          data: {
            email: args.email,
            username: args.username,
            password: args.password,
          },
        });
        return user;
      },
    });
  },
});

export const UserQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.field("users", {
      type: User,
      resolve(_root, _args, ctx) {
        return ctx.prisma.user.findMany();
      },
    });
  },
});
