import supabase from "../config/supabaseClient";

export const subscribeToNewsletter = async (userEmail, userId = null) => {
  try {
    // Check if already subscribed
    const existingCheck = await checkSubscriptionStatus(userEmail, userId);
    if (existingCheck.isSubscribed) {
      return {
        success: false,
        error: "You are already subscribed to our newsletter.",
      };
    }

    // Insert new subscription
    const { data, error } = await supabase
      .from("email_subscriptions")
      .insert({
        user_id: userId,
        user_email: userEmail,
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    return { success: true, data };
  } catch (error) {
    console.error("Error subscribing to newsletter:", error);
    return { success: false, error: "Failed to subscribe. Please try again." };
  }
};

export const checkSubscriptionStatus = async (userEmail, userId = null) => {
  try {
    // Check by user_id first if available
    if (userId) {
      const { data: userData, error: userError } = await supabase
        .from("email_subscriptions")
        .select("id, user_email, user_id, created_at")
        .eq("user_id", userId)
        .single();

      if (userData) {
        return { isSubscribed: true, data: userData };
      }
    }

    // Check by email
    const { data, error } = await supabase
      .from("email_subscriptions")
      .select("id, user_email, user_id, created_at")
      .eq("user_email", userEmail)
      .single();

    if (error && error.code !== "PGRST116") {
      throw error;
    }

    return { isSubscribed: !!data, data };
  } catch (error) {
    console.error("Error checking subscription status:", error);
    return { isSubscribed: false, error: error.message };
  }
};
