import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  await prisma.user.create({
    data: { email: "testmail@gmail.com", username: "kk", password: "kkkds" },
  });
};

main()
  .catch((err) => {
    console.log(err.message);
  })
  .finally(() => {
    prisma.$disconnect();
  });
