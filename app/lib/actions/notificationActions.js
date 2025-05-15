import supabase from "../config/supabaseClient";

export const getCurrentUser = async () => {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error) throw error;
  if (!user) throw new Error("No authenticated user found");
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("id, userName, subscription")
    .eq("id", user.id)
    .single();
  if (profileError) throw profileError;
  return {
    ...user,
    profile,
  };
};

export const notifyPasswordChange = async (userId) => {
  try {
    const { data, error } = await supabase
      .from("notifications")
      .insert({
        user_id: userId,
        type: "PASSWORD_RESET_NOTIFY",
        message: "Your password has been changed successfully",
        read: false,
        importance: "high",
        metadata: {},
        action_url: "",
      })
      .select()
      .single();
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error("Error creating password change notification:", error);
    return { data: null, error: error.message };
  }
};

export const notifyLeadsUsage = async () => {
  try {
    const user = await getCurrentUser();
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("total_leads_received, last_notification_timestamp")
      .eq("id", user.id)
      .single();
    if (profileError) throw profileError;
    const { data: userLeads, error: leadsError } = await supabase
      .from("user_leads")
      .select("used")
      .eq("user_id", user.id);
    if (leadsError) throw leadsError;
    if (!userLeads || userLeads.length === 0)
      return { data: null, error: null };
    const totalLeads = userLeads.length;
    const usedLeads = userLeads.filter((lead) => lead.used).length;
    const usagePercentage = (usedLeads / totalLeads) * 100;
    const shouldNotify =
      usagePercentage >= 80 &&
      (!profile.last_notification_timestamp ||
        profile.last_notification_timestamp < profile.total_leads_received);
    if (shouldNotify) {
      const { data, error } = await supabase
        .from("notifications")
        .insert({
          user_id: user.id,
          type: "LEADS_USAGE_NOTIFY",
          message: `${user?.profile?.userName || "Hello"}, you are out of your leads soon, consider upgrading your plan`,
          read: false,
          importance: "high",
          metadata: {
            usage_percentage: usagePercentage,
            total_leads: totalLeads,
            used_leads: usedLeads,
          },
          action_url: "/dashboard/subscription",
        })
        .select()
        .single();
      if (error) throw error;
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ last_notification_timestamp: new Date().toISOString() })
        .eq("id", user.id);
      if (updateError) throw updateError;
      return { data, error: null };
    }
    return { data: null, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
};

export const notifyUserRegistration = async () => {
  try {
    const user = await getCurrentUser();
    const { data, error } = await supabase
      .from("notifications")
      .insert({
        user_id: user.id,
        type: "WELCOME_NOTIFY",
        message: `Welcome to Hyperlead ${user?.profile?.userName || " "}! You're all set to explore, manage your leads and grow your outreach.`,
        read: false,
        importance: "medium",
        metadata: {},
        action_url: "",
      })
      .select()
      .single();
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
};

export const notifyUserOnSubscription = async (assignedLeadsCount) => {
  try {
    const user = await getCurrentUser();
    const { data, error } = await supabase
      .from("notifications")
      .insert({
        user_id: user.id,
        type: "SUBSCRIPTION_SUCCESS_NOTIFY",
        message: `${user?.profile?.userName}, you have successfully subscribed to ${user?.profile?.subscription} plan`,
        read: false,
        importance: "low",
        metadata: {
          received_leads: assignedLeadsCount,
        },
        action_url: "",
      })
      .select()
      .single();
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
};

export const notifyUserOnBugFix = async () => {
  try {
    const user = await getCurrentUser();
    const { data, error } = await supabase
      .from("notifications")
      .insert({
        user_id: user.id,
        type: "BUG_FIX_NOTIFY",
        message: `We have fixed the bug you reported. Thank you for your feedback!`,
        read: false,
        importance: "low",
        metadata: {},
        action_url: "",
      })
      .select()
      .single();
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
};
