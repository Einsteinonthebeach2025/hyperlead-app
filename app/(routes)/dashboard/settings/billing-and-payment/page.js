import BillingAndPayment from "app/pages/dashboard/settings/BillingAndPayment/BillingAndPayment";
import { createServerClient } from "app/lib/config/supabaseServer";

const BillingAndPaymentPage = async () => {
  const supabase = await createServerClient();

  // Get current user session
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError || !session?.user) {
    return (
      <BillingAndPayment transactions={[]} error="Authentication required" />
    );
  }

  // Fetch user transactions directly
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

  return <BillingAndPayment transactions={transactions || []} />;
};

export default BillingAndPaymentPage;
