import { createTRPCRouter, orgProcedure } from "../init";

export const billingRouter = createTRPCRouter({
  createCheckout: orgProcedure.mutation(async ({ ctx }) => {
    return { checkoutUrl: "/" };
  }),

  createPortalSession: orgProcedure.mutation(async ({ ctx }) => {
    return { portalUrl: "/" };
  }),

  getStatus: orgProcedure.query(async ({ ctx }) => {
    return {
      hasActiveSubscription: true,
      customerId: null,
      estimatedCostCents: 0,
    };
  }),
});