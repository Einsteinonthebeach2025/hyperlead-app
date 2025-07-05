const pricingData = [
  {
    id: 0,
    title: "Plus",
    desc: "Perfect for solo founders or early-stage teams building outbound from scratch.",
    price: 0.01,
    annualPrice: 0.01,
    leads: 150,
    link: "/",
    // planId: "P-74J685623B288143WNBN7CQY", production plan ID
    plan_id: "P-7XH25132HX613060MNBOTB5I", // SANDBOX test SUBSCRIPTION plan ID
    annualPlanId: "P-ANNUAL-PLUS-PLACEHOLDER",
    benefits: [
      "150 high-quality B2B leads/month",
      "Verified decision-makers: CEOs, Founders, Managers",
      "Smart filters (industry, role, location, revenue, headcount)",
      " Full contact details: email, direct dial, company info",
      "Email leads directly from your dashboard",
      "Create up to 10 campaigns/month",
      "Real-time status tracking: Delivers, Opens",
      "Dashboard analytics & activity logs",
      "Unused leads roll over to next month",
      "Email support",
    ],
  },
  {
    id: 1,
    title: "PRO",
    desc: "Ideal for growing teams and outreach-driven companies looking to scale.",
    price: 99,
    annualPrice: 950,
    leads: 400,
    link: "/",
    color: true,
    // planId: "P-2TJ41897NU456330ANBN7EEY", production plan ID
    plan_id: "P-9HX723217A653215GNBUSP5Q", // SANDBOX test SUBSCRIPTION plan ID
    annualPlanId: "P-ANNUAL-PRO-PLACEHOLDER",
    benefits: [
      "400 targeted B2B leads/month",
      "Decision-maker contacts: CEOs, Founders, Managers, Directors",
      "Advanced filters: funding status, tech stack, employee size, location",
      "Full lead details: email, direct dial, company info, revenue, HQ address",
      "AI-powered lead scoring & prioritization",
      "Create up to 50 campaigns/month",
      "Real-time engagement tracking",
      "Campaign analytics & performance insights",
      "ChatGPT-4 built-in for messaging",
      "Unused leads roll over",
      "Priority support",
    ],
  },
  {
    id: 2,
    title: "Hyper",
    desc: "Designed for outbound teams, agencies, and high-volume sales workflows.",
    price: 0.01,
    annualPrice: 1720,
    leads: 800,
    link: "/",
    // planId: "P-3M451725FG751784VNBN7FDY", production plan ID
    plan_id: "P-96114009C49438150NBUTQSI", // Production Plan ID for 1 day reccuring test
    annualPlanId: "P-ANNUAL-HYPER-PLACEHOLDER",
    benefits: [
      "800+ verified leads/month",
      "AAll Pro features included",
      "Unlimited email campaigns",
      "Dedicated account manager for onboarding + support",
      "Multi-user/team access with collaboration tools",
      "Slack & phone support",
      "Custom onboarding workflows",
    ],
  },
];

export default pricingData;
