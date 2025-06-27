export const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

export const SUBSCRIPTION_PLANS = {
  PLUS: {
    name: "Plus",
    price: "0.01",
    leads: 150,
    description: "Perfect for small businesses",
    plan_id: "P-74J685623B288143WNBN7CQY",
    // plan_id: "P-7XH25132HX613060MNBOTB5I",
  },
  PRO: {
    name: "PRO",
    price: "99",
    leads: 400,
    description: "Ideal for growing businesses",
    plan_id: "P-2TJ41897NU456330ANBN7EEY",
    // plan_id: "P-0AF34555UY783505PNBOTCKA",
  },
  HYPER: {
    name: "Hyper",
    price: "179",
    leads: 800,
    description: "For large scale operations",
    plan_id: "P-3M451725FG751784VNBN7FDY",
    // plan_id: "P-7T642266MY038194FNBOTDFI",
  },
};

export const EXTRA_LEADS_PLAN = {
  name: "Extra 100 Leads",
  price: "0.02",
  leads: 100,
  description: "One-time purchase of 100 additional leads.",
};

export const SINGLE_LEAD_PLAN = {
  name: "Lead Unlock",
  price: "0.02",
  leads: 1,
  description: "Unlock this specific lead for a one-time fee.",
};

export const getPlanDetails = (planName) => {
  switch (planName.toUpperCase()) {
    case "EXTRA_100":
      return EXTRA_LEADS_PLAN;
    case "SINGLE_LEAD":
      return SINGLE_LEAD_PLAN;
    default:
      return (
        SUBSCRIPTION_PLANS[planName.toUpperCase()] || SUBSCRIPTION_PLANS.PLUS
      );
  }
};
