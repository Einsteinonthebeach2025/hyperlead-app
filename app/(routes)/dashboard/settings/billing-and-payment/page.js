import BillingAndPayment from "app/pages/dashboard/settings/BillingAndPayment/BillingAndPayment";
import { createServerClient } from "app/lib/config/supabaseServer";

const BillingAndPaymentPage = async () => {
  const supabase = await createServerClient();

  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError || !session?.user) {
    return (
      <BillingAndPayment transactions={[]} error="Authentication required" />
    );
  }

  const { data: user, error: userError } = await supabase
    .from("profiles")
    .select(
      " subscription_id, email, userName, subscription_timestamp, id, subscription, subscription_status"
    )
    .eq("id", session.user.id)
    .single();

  if (userError) {
    return <BillingAndPayment transactions={[]} error="Failed to load user" />;
  }

  const { data: transactions, error: transactionsError } = await supabase
    .from("transactions")
    .select("*")
    .eq("user_id", session.user.id)
    .order("created_at", { ascending: false });

  if (transactionsError) {
    return (
      <BillingAndPayment
        transactions={[]}
        error="Failed to load transactions"
      />
    );
  }

  return <BillingAndPayment transactions={transactions || []} user={user} />;
};

export default BillingAndPaymentPage;
