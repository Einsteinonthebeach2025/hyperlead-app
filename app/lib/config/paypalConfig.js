export const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

export const SUBSCRIPTION_PLANS = {
  PLUS: {
    name: "PLUS",
    price: "39",
    annualPrice: "374",
    leads: 150,
    description: "Perfect for small businesses",
    // planId: "P-74J685623B288143WNBN7CQY",
    planId: "P-7XH25132HX613060MNBOTB5I",
    // annual_plan_id: "P-83F02828AK235573YNBUPPCY",
    annual_plan_id: "P-6UM118406D362493LNB37UZA",
  },
  PRO: {
    name: "PRO",
    price: "99",
    annualPrice: "950",
    leads: 400,
    description: "Ideal for growing businesses",
    // planId: "P-2TJ41897NU456330ANBN7EEY",
    planId: "P-9HX723217A653215GNBUSP5Q",
    // annual_plan_id: "P-1T529730KX668460NNBUPPQY",
    annual_plan_id: "P-8KK27710LB222034YNB37VHI",
  },
  HYPER: {
    name: "HYPER",
    price: "179",
    annualPrice: "1720",
    leads: 800,
    description: "For large scale operations",
    // planId: "P-3M451725FG751784VNBN7FDY",
    planId: "P-5YB76014V2287162GNBUVGWQ",
    // annual_plan_id: "P-3BM54016W0125070RNBUPQFI",
    annual_plan_id: "P-4582297294762771VNB37VRI",
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
