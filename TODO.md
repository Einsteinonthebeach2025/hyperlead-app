TODO LIST

---> graphchiqovani@yahoo.com
---> grapchiqovani@gmail.com

- რამე თესლი ლოადინგ ანიმაციაა საჭირო /auth/callback და მსგავსი ლოადინგებისთვის

1. USER REGISTRATION & SECURITY

- [x] CREATE USER (Email, UserName, Password)
- [x] GOOGLE authentication
- [x] After creation, navigate user to PREFERENCES page
- [x] Updating PREFERENCES will give 20 random lead from each industry
- [x] After PREFERENCES, navigate user to REGION page to choose region for getting leads accordingly
- [x] SIGN IN USER
- [x] RESET PASSWORD
- [x] UPDATE PASSWORD using verified link
- [x] 2FA Security with QRCODE
- [x] Track last reset password with timestamp

2. MY PROFILE PAGE

- [x] User can upload profile picture, if current user's image exists in database, it should be replaced
- [x] User can update his own profile information. Real time update for the UI
- [x] User can set wallpaper image and store imageURL to database
- [x] UPDATE PASSWORD using verified link
- [x] User can remove assitant from profile

3. DASHBOARD LEAD MANAGEMENT

- [x] Assign leads to user based on subscription plan
- [x] Assign leads to user based on their PREFERENCES and REGION
- [x] Filter leads based on COUNTRIES, EMPLOYEES, INDUSTRIES, CITIES, SENIORITY LEVELS
- [x] Search leads based on all properties
- [x] Send EMAIL to leads / multiple leads simultaneously
- [x] Update lead status to USED/UNUSED on click and on MARK icon click
- [x] Paginate leads

4. DASHBOARD ANALYTICS

- [x] Basic analytics (Current plan, monthly leads, monthly received leads, total received leads)
- [x] User's lead analytics, USED, REMAINING, TOTAL
- [x] Email statistics, SENT, OPENED, DELIVERED, OPEN RATE, DELIVERY RATE
- [x] User's top 5 lead analitycs based on their employee count
- [x] User's lead statistic based on COUNTRY
- [x] Current lead statistics based on INDUSTRY

5. DASHBOARD EMAIL ANALYTICS

- [x] Fetch users sent emails
- [x] Email card includes (RECIPIENT NAME, SUBJECT, MESSAGE, SENT DATE, COMPANY NAME, DELIVERED, OPENED, LINKEDIN URL)
- [x] Email has delete button and delete animation
- [x] Sort emails by month, delivered status, opened status,
- [x] Search emails by subject name and company title
- [ ] Each 3 month's old email will be removed (optional)

6. NOTIFICATION / REPORTING list

- [x] NOTIFY USER: After successful registration
- [x] NOTIFY USER: Your password was changed successfully. (with date data)
- [x] NOTIFY USER: After using 80% of leads
- [x] NOTIFY USER: After every successful subscription
- [x] NOTIFY USER: 5 days before subscription expiration
- [x] NOTIFY USER: About fixed bug he reported
- [x] NOTIFY USER: When subscription is out
- [x] NOTIFY USER: When someone wants to add him/her as an assistant
- [x] NOTIFY USER: After adding set of LEADS to the database (GLOBAL)
- [ ] NOTIFY USER: About every new feature is added to application (GLOBAL)
- [x] USER can report any bug and updates reported bugs count in database (reported_bugs field)
- [x] USER can give feedback with star rating
- [x] USER feedbacks first goes to admin panel with buttons APPROVED / DECLINED

7. SHARING LEADS MANAGEMENT

- [x] Users can add other users as their assistants using emails
- [x] Assistants can see "BOSSES" data in his/her dashboard
- [x] Assistants can toggle dashboard between boss's and own data
- [x] is a user tries to add an assistant that is already an assistant for other user, throw an error
- [x] PRO plans can add 1 assistant, ENTERPRISE plans can add 2 assistant

8. ADMINISTRATION PANEL

- [x] Admin panel has navigation bar (BUGS, USERS, FEEDBACKS)
- [x] BUGS: Each card has DELETE button and ACTION button (Action button sends notification to reporter with some fixed bug text)
- [x] FEEDBACKS: feedbacks are either approved or deleted
- [x] USER MANAGEMENT: all users with neccessary data in it
- [x] Admin can send a NOTIFICATIONS or EMAILS to all users or to a single user
- [ ] Admin can STOP subscription for any user
- [x] ANALYTICS: Total Users count with statistics graph
- [x] ANALYTICS: Weekly users count comparison vs last week
- [x] ANALYTICS: Based on country

  const handleSubscriptionSuccess = async (subscriptionID) => {
  setLoading(true);
  try {
  await updateProfile(user.id, { subscription_id: subscriptionID })
  const verifyResponse = await fetch("/api/paypal-subscription/verify", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
  subscriptionID,
  planName: selectedPlan,
  }),
  });
  const verifyData = await verifyResponse.json();
  if (!verifyData.success) throw new Error(verifyData.error || "Subscription verification failed");
  const { payerInfo, amount } = verifyData;
  const transactionResult = await createTransaction(
  user.id,
  subscriptionID,
  selectedPlan,
  amount || plan.price,
  { brand: "PayPal", last4: "N/A", maskedCard: "PayPal Subscription" },
  payerInfo,
  );
  if (!transactionResult.success) throw new Error(transactionResult.error);
  const subscriptionResult = await processSubscription(
  user.id,
  user.email,
  selectedPlan,
  plan.leads
  );
  if (!subscriptionResult.success) throw new Error(subscriptionResult.error);
  dispatch(setError({
  message: `Subscribed to ${selectedPlan} and received ${plan.leads} leads!`,
  type: "success",
  }));
  handleClose();
  } catch (error) {
  console.error("Subscription error:", error);
  dispatch(setError({ message: error.message, type: "error" }));
  } finally {
  setLoading(false);
  }
  };

  second

  const handleSubscriptionSuccess = async (subscriptionID) => {
  setLoading(true);
  try {
  await updateProfile(user.id, { subscription_id: subscriptionID })
  const verifyResponse = await fetch("/api/paypal-subscription/verify", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
  subscriptionID,
  planName: selectedPlan,
  }),
  });
  const verifyData = await verifyResponse.json();
  if (!verifyData.success) throw new Error(verifyData.error || "Subscription verification failed");
  const { payerInfo, amount } = verifyData;
  const transactionResult = await createTransaction(
  user.id,
  subscriptionID,
  selectedPlan,
  amount || plan.price,
  { brand: "PayPal", last4: "N/A", maskedCard: "PayPal Subscription" },
  payerInfo,
  );
  if (!transactionResult.success) throw new Error(transactionResult.error);
  const subscriptionResult = await processSubscription(
  user.id,
  user.email,
  selectedPlan,
  plan.leads
  );
  if (!subscriptionResult.success) throw new Error(subscriptionResult.error);
  dispatch(setError({
  message: `Subscribed to ${selectedPlan} and received ${plan.leads} leads!`,
  type: "success",
  }));
  handleClose();
  } catch (error) {
  console.error("Subscription error:", error);
  dispatch(setError({ message: error.message, type: "error" }));
  } finally {
  setLoading(false);
  }
  };

  webhook route.js
  import supabaseAdmin from "app/lib/config/supabaseAdmin";
  import { NextResponse } from "next/server";
  import { handleRecurringPaymentCompleted } from "app/lib/webhooks/recurringCreated";

export const config = {
api: {
bodyParser: false,
},
};

export async function POST(req) {
let body = "";
try {
body = await req.text();
const event = JSON.parse(body);
const eventType = event.event_type;
const eventId = event.id;

    console.log(`[PayPal Webhook] Event received: ${eventType}`);
    console.log(`[PayPal Webhook] Event ID: ${eventId}`);
    console.log(`[PayPal Webhook] Full event body:`, event);

    if (eventType === "PAYMENT.SALE.COMPLETED") {
      const resource = event.resource;
      const result = await handleRecurringPaymentCompleted(
        eventId,
        resource,
        supabaseAdmin
      );
      if (result.duplicate) {
        return NextResponse.json(
          { received: true, duplicate: true },
          { status: 200 }
        );
      }
      if (!result.success) {
        return NextResponse.json(
          { error: result.error || "Unknown error" },
          { status: 500 }
        );
      }
      return NextResponse.json({ received: true, eventType }, { status: 200 });
    }

    if (eventType === "BILLING.SUBSCRIPTION.CREATED") {
      console.log("2 BILLING.SUBSCRIPTION.CREATED fired");
    }

    if (eventType === "BILLING.SUBSCRIPTION.ACTIVATED") {
      console.log("3 BILLING.SUBSCRIPTION.ACTIVATED fired");
    }

    if (eventType === "BILLING.SUBSCRIPTION.CANCELLED") {
      console.log("4 BILLING.SUBSCRIPTION.CANCELLED fired");
    }

    if (eventType === "PAYMENT.CAPTURE.COMPLETED") {
      console.log("4 PAYMENT.CAPTURE.COMPLETED fired");
    }

    return NextResponse.json({ received: true, eventType }, { status: 200 });

} catch (err) {
console.error("[PayPal Webhook] Error parsing event:", err, body);
return NextResponse.json(
{ error: "Invalid webhook payload" },
{ status: 400 }
);
}
}

export async function GET() {
console.log("HELLO FROM LIVE PAYPAL WEBHOOK (is working)");
return NextResponse.json({
message: "HELLO FROM LIVE PAYPAL WEBHOOK (is working)",
});
}
