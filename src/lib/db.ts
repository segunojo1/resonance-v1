import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { env } from "./env";

const adapter = new PrismaPg({
    connectionString: env.DATABASE_URL,
});

const globalFoPrisma = global as unknown as { prisma: PrismaClient };

const prisma = globalFoPrisma.prisma || new PrismaClient({ adapter })

if (process.env.NODE_ENV !== "production") globalFoPrisma.prisma = prisma;

export {prisma}; 