export const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

export const SUBSCRIPTION_PLANS = {
  PLUS: {
    name: "PLUS",
    price: "39.00",
    annualPrice: "374",
    leads: 150,
    description: "Perfect for small businesses",
    planId: "P-7XH25132HX613060MNBOTB5I",
    // planId: "P-74J685623B288143WNBN7CQY" production,
    annual_plan_id: "P-0P26852608051814KNCAMBZQ",
    // annual_plan_id: "P-83F02828AK235573YNBUPPCY", production
  },
  PRO: {
    name: "PRO",
    price: "99.00",
    annualPrice: "950.00",
    leads: 400,
    description: "Ideal for growing businesses",
    planId: "P-9HX723217A653215GNBUSP5Q",
    // planId: "P-2TJ41897NU456330ANBN7EEY", production
    annual_plan_id: "P-31Y92320KJ352140GNCAMCMI",
    // annual_plan_id: "P-1T529730KX668460NNBUPPQY", production
  },
  HYPER: {
    name: "HYPER",
    price: "179.00",
    annualPrice: "1720",
    leads: 800,
    description: "For large scale operations",
    planId: "P-5YB76014V2287162GNBUVGWQ",
    // planId: "P-3M451725FG751784VNBN7FDY", production
    annual_plan_id: "P-52097423WX019551UNCAMDFQ",
    // annual_plan_id: "P-3BM54016W0125070RNBUPQFI", production
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
