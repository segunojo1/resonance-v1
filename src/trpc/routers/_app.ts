import { z } from 'zod';
import { baseProcedure, createTRPCRouter } from '../init';
import { voicesRouter } from './voices';
 
export const appRouter = createTRPCRouter({
//   health: baseProcedure.query(async () => {

//     throw new Error('Health check failed');
//     return { status: 'ok', code: 123 };
//   })
     voices: voicesRouter,
});
 
// export type definition of API
export type AppRouter = typeof appRouter;