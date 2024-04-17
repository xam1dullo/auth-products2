// prisma/seed.ts

import { PrismaClient } from '@prisma/client';

// initialize Prisma Client

const prisma = new PrismaClient();

async function main() {
  // create two dummy articles

  const post1 = await prisma.user.create({
    data: {
      username: 'xamidullo',
      password: '123456',
      phone: '+99894611066',
    },
  });

  const post2 = await prisma.user.create({
    data: {
      username: 'azizbek',
      password: '654321',
      phone: '+99894611066',
    },
  });

  console.log({ post1, post2 });
}

// execute the main function

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
