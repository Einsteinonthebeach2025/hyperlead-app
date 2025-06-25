export const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

export const SUBSCRIPTION_PLANS = {
  PLUS: {
    name: "Plus",
    price: "0.01",
    leads: 20,
    description: "Perfect for small businesses",
    plan_id: "P-3M451725FG751784VNBN7FDY",
  },
  PRO: {
    name: "PRO",
    price: "19.99",
    leads: 40,
    description: "Ideal for growing businesses",
    plan_id: "P-2TJ41897NU456330ANBN7EEY",
  },
  HYPER: {
    name: "Hyper",
    price: "29.99",
    leads: 60,
    description: "For large scale operations",
    plan_id: "P-3M451725FG751784VNBN7FDY",
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
