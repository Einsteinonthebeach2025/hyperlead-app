export const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

export const SUBSCRIPTION_PLANS = {
  PLUS: {
    name: "PLUS",
    price: "39",
    annualPrice: "374",
    leads: 150,
    description: "Perfect for small businesses",
    planId: "P-74J685623B288143WNBN7CQY",
    annual_plan_id: "P-83F02828AK235573YNBUPPCY",
  },
  PRO: {
    name: "PRO",
    price: "0.01",
    annualPrice: "0.01",
    leads: 400,
    description: "Ideal for growing businesses",
    planId: "P-2TJ41897NU456330ANBN7EEY",
    annual_plan_id: "P-1T529730KX668460NNBUPPQY",
  },
  HYPER: {
    name: "HYPER",
    price: "179",
    annualPrice: "1720",
    leads: 800,
    description: "For large scale operations",
    planId: "P-3M451725FG751784VNBN7FDY",
    annual_plan_id: "P-3BM54016W0125070RNBUPQFI",
  },
};

export const EXTRA_LEADS_PLAN = {
  name: "Extra 100 Leads",
  price: "0.01",
  leads: 100,
  description: "One-time purchase of 100 additional leads.",
};

export const SINGLE_LEAD_PLAN = {
  name: "Lead Unlock",
  price: "0.01",
  leads: 1,
  description: "Unlock this specific lead for a one-time fee.",
};

export const getPlanDetails = (planName, mode = "monthly") => {
  switch (planName.toUpperCase()) {
    case "EXTRA_100":
      return EXTRA_LEADS_PLAN;
    case "SINGLE_LEAD":
      return SINGLE_LEAD_PLAN;
    default: {
      const plan =
        SUBSCRIPTION_PLANS[planName.toUpperCase()] || SUBSCRIPTION_PLANS.PLUS;
      if (mode === "annual") {
        return {
          ...plan,
          price: plan.annualPrice,
          plan_id: plan.annual_plan_id,
          isAnnual: true,
        };
      }
      return plan;
    }
  }
};
