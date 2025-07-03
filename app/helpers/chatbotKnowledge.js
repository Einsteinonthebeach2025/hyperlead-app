export const appFeatures = `
HyperLead features:
- Users can update their profile picture (avatar) in account settings.
- You can change your password at any time via reset password link or from the account settings.
- HyperLead provides monthly lead delivery according to your preferences and subscription plan.
- Webpage supports dark mode/theme.
- Users change their preferences at any time from the industry preferences page.
- Users can pause their subscription at any time from the account settings.
- Users can cancel their subscription at any time from the account settings.
- You can change your subscription plan at any time from pricing section.
- Users can add teammates to their workspace from ADD TEAMMATE page.
- Hyper plan users can add 2 teammates at the same time.
- Pro plan users can add 1 teammates at the same time.
- Users can view their transaction history from the billing and payment page.
- Users can report about any bug or issue from the REPORT BUG page.
- Users can add their feedbacks from the FEEDBACK page.
- Users can view their account information from the account settings.
- Users can view their transaction history from the billing and payment page.
- Hyperlead has 3 basic subscription plans PLUS, PRO and HYPER.
- Users can add or update profile information from profile page.
- Hyperlead provides a vast statistic and analytics for users in dashboard page.
- Users can access full hyperlead database of leads using on-demand search .
- Users can add additional leads to their account at any time which is one time payment.
`;

export const chatbotKnowledge = [
  {
    triggers: [
      "I didn't get my new leads",
      "My subscription failed",
      "Payment didn't go through",
      "Why can't I access new leads?",
      "What happens if my card declines?",
    ],
    answer:
      "If payment fails, your subscription pauses and new leads won't be delivered. Just update your payment info and the system will auto-resume. You can manage everything from your account page.",
  },
  {
    triggers: [
      "Is there a free trial?",
      "Can I test it out before paying?",
      "How do I know it works?",
      "Can I see some leads before buying?",
      "Is there a free plan?",
    ],
    answer:
      "Yes - you can get started with a free trial and receive 20 real leads, completely free. No credit card required. Just sign up, set your targeting, and your sample leads will appear in your dashboard. Try before you buy — risk-free.",
  },
];

// {
//   triggers: [
//     "Do you offer refunds?",
//     "What if I'm not happy with the leads?",
//     "Can I get my money back?",
//   ],
//   answer:
//     "We offer refunds in cases of technical failure or undelivered leads. For peace of mind, start with the free trial — get 20 leads upfront, no payment needed. That way, you only pay if it works for you.",
// },
// {
//   triggers: [
//     "Can I search for specific leads?",
//     "What if I want contacts from a specific company?",
//     "What does 'On-Demand Search' mean?",
//     "Can I get leads outside my plan?",
//   ],
//   answer:
//     "Custom Leads let Pro & hyper users search our entire lead database for specific companies or filters. You can request leads like 'VPs at Ford' or 'Design agencies in Berlin' and get instant results. With Custom Leads, you become your own data sniper — no waiting, just precision.",
// },
// {
//   triggers: [
//     "How do I get leads?",
//     "What do I need to do to use it?",
//     "Is this automated?",
//     "How do I start getting leads?",
//     "Will you send me leads?",
//     "Do I have to search for leads manually?",
//   ],
//   answer:
//     "You sign up and select your target audience (e.g., industry, title, country). You get new leads in your dashboard monthly. Use AI tools inside Hyperlead to write and send emails + follow-ups. No scraping, no spreadsheets, no tech skills needed.",
// },
// {
//   triggers: [
//     "What are your features?",
//     "Why should I use Hyperlead?",
//     "What can I do on the platform?",
//     "Do you offer anything besides leads?",
//     "Can I automate emails?",
//   ],
//   answer:
//     "Hyperlead stands out because it: Sends leads monthly, no manual effort. Offers AI email generation + follow-ups. Filters leads to match your exact profile. Doesn't require exporting or outside tools — everything happens inside the platform.",
// },
// {
//   triggers: [
//     "Can I legally email these leads?",
//     "Is this GDPR compliant?",
//     "Am I allowed to use these contacts?",
//     "Is it spammy?",
//     "Do I have to worry about data privacy?",
//   ],
//   answer:
//     "Hyperlead is fully legal. We only use public or licensed sources and follow GDPR, CAN-SPAM, and PECR laws. You can email leads for B2B purposes directly from the dashboard. Data export is not allowed.",
// },
// {
//   triggers: [
//     "Are the leads accurate?",
//     "Is this high-quality data?",
//     "Where do you get the leads from?",
//     "How do I know these emails work?",
//   ],
//   answer:
//     "Our leads are verified through multiple sources and strict quality checks before they reach your dashboard. We use both proprietary methods and licensed databases to ensure accuracy. Bounce rates stay under 5%, and every contact is B2B-ready.",
// },
// {
//   triggers: [
//     "I have my own database",
//     "I already use scraping tools",
//     "What's the difference from other lead services?",
//     "Why pay for this if I can build lists myself?",
//   ],
//   answer:
//     "That's exactly why Hyperlead exists — to save you time, effort, and guesswork. No spreadsheets, no scraping, no filters. We deliver ready-to-email leads every month based on your ideal client profile. You focus on outreach — we do the heavy lifting.",
// },
// {
//   triggers: [
//     "What's the price?",
//     "How much do I pay?",
//     "Do you have monthly plans?",
//     "What's included in each plan?",
//     "Is it a subscription?",
//     "Is there a free version?",
//   ],
//   answer:
//     "We offer 3 plans: Plus - 150 leads/month, Pro - 400 leads/month + priority targeting, Hyper - 800+ leads/month + on-demand search + exclusive features.",
// },
// {
//   triggers: ["Can I buy extra leads without a subscription?"],
//   answer:
//     "Yes - you can buy 100 leads anytime for $29, no subscription needed.",
// },
// {
//   triggers: [
//     "I can't access my account",
//     "Login isn't working",
//     "Forgot my password",
//     "I signed up with Google, now I can't get in",
//     "Account issue",
//   ],
//   answer:
//     "If you signed up with Google, use the same Google button to log in. Otherwise, reset your password from the login page. Still stuck? Contact support and we'll fix it fast.",
// },
// {
//   triggers: ["I didn't get my leads this month"],
//   answer:
//     "Make sure your subscription is active. If payment failed, your plan may be paused. You can retry from your account page.",
// },
// {
//   triggers: [
//     "Why go Pro or hyper?",
//     "What's the difference between plans?",
//     "What does hyper include?",
//     "Is it worth upgrading?",
//   ],
//   answer:
//     "Upgrading unlocks: More leads per month. Faster lead delivery. Custom On-Demand Lead Search. AI Campaigns & Automation tools. Access to support priority queue. hyper users get the best ROI — built for scale.",
// },
// {
//   triggers: [
//     "What does Hyperlead do?",
//     "Tell me about Hyperlead",
//     "What kind of service is this?",
//     "Is this a lead platform?",
//     "Can you explain what Hyperlead is?",
//     "What is this tool?",
//     "Is this a CRM?",
//   ],
//   answer:
//     "Hyperlead is an AI-powered B2B lead generation platform. We deliver verified, high-quality contacts straight to your dashboard every month — filtered by your ideal customer profile. You send the emails. We handle the hard part.",
// },
// {
//   triggers: ["Is this a lead database?"],
//   answer:
//     "Not quite. You don't buy access to a static list — you subscribe to an automated service that sends fresh, tailored, and actionable leads to your dashboard.",
// },
// {
//   triggers: ["Can I pause my subscription?"],
//   answer:
//     "Yes. You can pause your subscription anytime from your account page. Leads won't be delivered during the pause, but your preferences will be saved.",
// },
// {
//   triggers: ["Can I change my targeting after subscribing?"],
//   answer:
//     "Absolutely. Just go to your settings and update your preferences — new leads will match your updated profile from the next batch onward.",
// },
// {
//   triggers: ["What if my leads bounce or are incorrect?"],
//   answer:
//     "If any leads bounce, report them in-app. We automatically replace bounced or invalid leads with new ones at no cost.",
// },
// {
//   triggers: ["Can I carry over unused leads to the next month?"],
//   answer:
//     "Unused leads don't carry over, but you can always top up your account with extra leads at any time.",
// },
// {
//   triggers: ["Can I use Hyperlead for clients as an agency?"],
//   answer:
//     "Yes — agencies use Hyperlead to run lead campaigns for clients. Each subscription is per workspace, but you can manage multiple clients under different workspaces.",
// },
