export const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

export const SUBSCRIPTION_PLANS = {
  PLUS: {
    name: "Plus",
    price: "0.01",
    leads: 20,
    description: "Perfect for small businesses",
  },
  PRO: {
    name: "PRO",
    price: "19.99",
    leads: 40,
    description: "Ideal for growing businesses",
  },
  HYPER: {
    name: "Hyper",
    price: "29.99",
    leads: 60,
    description: "For large scale operations",
  },
};

export const EXTRA_LEADS_PLAN = {
  name: "Extra 100 Leads",
  price: "29.00",
  leads: 100,
  description: "One-time purchase of 100 additional leads.",
};

export const getPlanDetails = (planName) => {
  return SUBSCRIPTION_PLANS[planName.toUpperCase()] || SUBSCRIPTION_PLANS.PLUS;
};
