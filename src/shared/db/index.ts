import { PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';

// Example https://github.com/prisma/prisma-examples/blob/latest/typescript/rest-nextjs-api-routes-auth/lib/prisma.ts
// 1)
const prismaClientSingleTon = () => {
  return new PrismaClient().$extends(withAccelerate());
};

// 2)
type PrismaClientSingleton = ReturnType<typeof prismaClientSingleTon>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

// 3)
export const db = globalForPrisma.prisma ?? prismaClientSingleTon();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = db;
}

/* Alternative Prisma Define Client

  let prisma: PrismaClientSingleton;

  if (process.env.NODE_ENV === 'production') {
    prisma = prismaClientSingleTon();
  } else {
    if (!globalForPrisma.prisma) {
      globalForPrisma.prisma = prismaClientSingleTon();
    }
    prisma = globalForPrisma.prisma;
  }

  export const db = prisma;
*/
