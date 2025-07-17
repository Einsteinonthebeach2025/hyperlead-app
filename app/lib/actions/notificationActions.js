import supabase from "../config/supabaseClient";

export const getCurrentUser = async (supabaseClient = supabase) => {
  const {
    data: { user },
    error,
  } = await supabaseClient.auth.getUser();
  if (error) throw error;
  if (!user) throw new Error("No authenticated user found");
  const { data: profile, error: profileError } = await supabaseClient
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
        message:
          "Password changed successfully. You can view the password change history in your profile.",
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
    const userName = user?.profile?.userName || user?.user_metadata?.name;
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
          message: `${userName}, You've used 80% of your monthly limit. Upgrade now to keep your outreach running smoothly.`,
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

export const notifyUserRegistration = async (supabaseClient = supabase) => {
  try {
    const user = await getCurrentUser(supabaseClient);
    const userName = user?.profile?.userName || user?.user_metadata?.name;
    const { data, error } = await supabaseClient
      .from("notifications")
      .insert({
        user_id: user.id,
        type: "WELCOME_NOTIFY",
        message: `Welcome to Hyperlead ${userName}! Your dashboard is ready. start exploring leads, launching campaigns, and growing your outreach.`,
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

export const notifyUserOnSubscription = async (
  userId,
  userName,
  subscription,
  assignedLeadsCount,
  supabaseClient = supabase
) => {
  try {
    const { data, error } = await supabaseClient
      .from("notifications")
      .insert({
        user_id: userId,
        type: "SUBSCRIPTION_SUCCESS_NOTIFY",
        message: `${userName}, you have successfully subscribed to ${subscription} plan. Check your dashboard.`,
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

export const notifyUserOnRecurring = async (
  userId,
  userName,
  subscription,
  assignedLeadsCount,
  supabaseClient = supabase
) => {
  try {
    const { data, error } = await supabaseClient
      .from("notifications")
      .insert({
        user_id: userId,
        type: "RECURRING_PAYMENT_NOTIFY",
        message: `${userName}, your recurring payment for the ${subscription} plan was successful. Your leads have been renewed.`,
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

export const notifyUserOnBugFix = async (bugId) => {
  try {
    const { data: bug, error: bugError } = await supabase
      .from("bug_reports")
      .select("user_id, id, header")
      .eq("id", bugId)
      .single();
    if (bugError) throw bugError;
    if (!bug) throw new Error("Bug not found");

    const { data, error } = await supabase
      .from("notifications")
      .insert({
        user_id: bug.user_id,
        type: "BUG_FIX_NOTIFY",
        message: `We have fixed the bug "${bug.header}" that you reported. Thank you for your feedback!`,
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
    console.error("Error in notifyUserOnBugFix:", error);
    return { data: null, error: error.message };
  }
};

export const notifyUserFomAdmin = async (userId, message, importance) => {
  try {
    const { data, error } = await supabase
      .from("notifications")
      .insert({
        user_id: userId,
        type: "ADMINISTRATION_NOTIFY",
        message: message,
        read: false,
        importance: importance,
        metadata: {},
        action_url: "",
      })
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error("Error creating admin notification:", error);
    return { data: null, error: error.message };
  }
};

export const deleteNotification = async (notificationId) => {
  try {
    const { data, error } = await supabase
      .from("notifications")
      .delete()
      .eq("id", notificationId);
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
};

export const notifyLeadsFinished = async () => {
  try {
    const user = await getCurrentUser();
    const userName = user?.profile?.userName || user?.user_metadata?.name;
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("last_leads_finished_notification, userName")
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
    const allUsed = userLeads.every((lead) => lead.used);
    const shouldNotify = allUsed && !profile.last_leads_finished_notification;

    if (shouldNotify) {
      const { data, error } = await supabase
        .from("notifications")
        .insert({
          user_id: user.id,
          type: "leads_finish",
          message: `${userName}, You've reached your monthly limit. Unlock your next batch of verified leads now.`,
          read: false,
          importance: "high",
          metadata: {},
          action_url: "/dashboard/subscription",
        })
        .select()
        .single();
      if (error) throw error;
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ last_leads_finished_notification: new Date().toISOString() })
        .eq("id", user.id);
      if (updateError) throw updateError;
      return { data, error: null };
    }
    return { data: null, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
};

export const notifyAssistantInvitation = async (bossId, assistantEmail) => {
  try {
    const { data: assistantProfile, error: assistantError } = await supabase
      .from("profiles")
      .select("id, userName, email")
      .eq("email", assistantEmail)
      .single();
    if (assistantError || !assistantProfile) {
      throw new Error("This user does not exist.");
    }
    const { data: bossProfile, error: bossError } = await supabase
      .from("profiles")
      .select("userName, user_assistant, subscription")
      .eq("id", bossId)
      .single();
    if (bossError || !bossProfile)
      throw bossError || new Error("Boss profile not found");

    const bossName = bossProfile?.userName || "";
    const assistants = bossProfile?.user_assistant || [];

    // Check if assistant is already in the list
    if (assistants.includes(assistantEmail)) {
      throw new Error("This user is already your assistant.");
    }

    // Check subscription limits
    const subscription = bossProfile.subscription;
    if (subscription === "PRO" && assistants.length >= 1) {
      throw new Error(
        "Your PRO plan allows only 1 assistant. Please upgrade to Enterprise for one more assistant."
      );
    }
    if (subscription === "Enterprise" && assistants.length >= 2) {
      throw new Error("Your Enterprise plan allows maximum 2 assistants.");
    }
    const { data: notification, error: notificationError } = await supabase
      .from("notifications")
      .insert({
        user_id: assistantProfile.id,
        type: "assistancy",
        message: `${assistantProfile.userName || "Hello"}, ${bossName} wants to add you as a teammate`,
        read: false,
        importance: "medium",
        metadata: { bossId, bossUserName: bossName, assistantEmail },
        action_url: "",
      })
      .select()
      .single();
    if (notificationError) throw notificationError;
    return { data: notification, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
};

export const notifyAssistantAccept = async (bossId, assistantEmail) => {
  const { data: assistantProfile, error: profileError } = await supabase
    .from("profiles")
    .select("userName")
    .eq("email", assistantEmail)
    .single();
  if (profileError) {
    console.error("Failed to fetch assistant profile:", profileError);
    return { success: false, error: "Assistant profile not found." };
  }
  const { data: notification, error: notificationError } = await supabase
    .from("notifications")
    .insert({
      user_id: bossId,
      type: "assistancy_response",
      message: `${assistantProfile.userName || "Hello"} (${assistantEmail}) has accepted your teammate request.`,
      read: false,
      importance: "medium",
      metadata: {},
      action_url: "",
    })
    .select()
    .single();
  if (notificationError) {
    console.error("Failed to send notification to boss:", notificationError);
    return { success: false, error: "Failed to notify boss." };
  }
  return { success: true, data: notification };
};

export const notifyUnlockingLead = async (userId, userName) => {
  try {
    const { data, error } = await supabase
      .from("notifications")
      .insert({
        user_id: userId,
        type: "unlocking lead",
        message: `${userName}, you have successfully unlocked lead.`,
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

export const notifySubscriptionCancel = async (userId) => {
  try {
    const { data, error } = await supabase
      .from("notifications")
      .insert({
        user_id: userId,
        type: "SUBSCRIPTION_CANCEL_NOTIFY",
        message:
          "Subscription successfully cancelled. During inactive you will no longer have access to leads.",
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
    console.error("Error creating subscription cancel notification:", error);
    return { data: null, error: error.message };
  }
};

export const notifyExtraLeadsPurchase = async (userId, userName, count) => {
  try {
    const { data, error } = await supabase
      .from("notifications")
      .insert({
        user_id: userId,
        type: "EXTRA_LEADS_PURCHASE_NOTIFY",
        message: `${userName}, you have successfully purchased ${count} extra leads!`,
        read: false,
        importance: "low",
        metadata: { count },
        action_url: "/dashboard/activities/leads",
      })
      .select()
      .single();
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
};

export const notifySingleLeadUnlock = async (userId, userName, leadId) => {
  try {
    const { data, error } = await supabase
      .from("notifications")
      .insert({
        user_id: userId,
        type: "SINGLE_LEAD_UNLOCK_NOTIFY",
        message: `${userName}, you have successfully unlocked a lead!`,
        read: false,
        importance: "low",
        metadata: { leadId },
        action_url: "/dashboard/unlocked-leads",
      })
      .select()
      .single();
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
};
