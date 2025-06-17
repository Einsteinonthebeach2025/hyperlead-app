import supabase from "../config/supabaseClient";

export const checkSubscriptionExpiration = async (userId) => {
  try {
    const { data: profile, error } = await supabase
      .from("profiles")
      .select("subscription_timestamp, subscription")
      .eq("id", userId)
      .single();
    if (error) throw error;
    if (!profile.subscription || !profile.subscription_timestamp) {
      return { expired: true };
    }
    const subscriptionDate = new Date(profile.subscription_timestamp);
    const now = new Date();
    const oneMonthLater = new Date(subscriptionDate);
    oneMonthLater.setMonth(oneMonthLater.getMonth() + 1);
    const expired = now > oneMonthLater;
    if (expired) {
      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          subscription: null,
          subscription_timestamp: null,
          monthly_leads: 0,
          leads_received_this_month: 0,
        })
        .eq("id", userId);
      if (updateError) throw updateError;
    }
    return { expired };
  } catch (error) {
    console.error("Error checking subscription expiration:", error);
    return { expired: false, error: error.message };
  }
};

export const assignLeadsToUser = async (
  userId,
  userEmail,
  preferences,
  leadCount,
  isNewSubscription = false
) => {
  try {
    const {
      data: { session },
      error: authError,
    } = await supabase.auth.getSession();
    if (authError) {
      throw new Error(`Authentication error: ${authError.message}`);
    }
    if (!preferences || preferences.length === 0) {
      throw new Error(
        "No preferences set. Please set your industry preferences first."
      );
    }
    const { data: userProfile, error: profileError } = await supabase
      .from("profiles")
      .select("region")
      .eq("id", userId)
      .single();
    if (profileError) {
      throw new Error(`Failed to fetch profile: ${profileError.message}`);
    }
    const hasRegionPreferences =
      userProfile.region && userProfile.region.length > 0;
    let availableCountries = [];
    if (hasRegionPreferences) {
      const { data: availableLeads, error: leadsError } = await supabase
        .from("leads")
        .select("country")
        .in("country", userProfile.region)
        .limit(1);
      if (leadsError) {
        throw new Error(
          `Failed to check available countries: ${leadsError.message}`
        );
      }
      availableCountries = [
        ...new Set(availableLeads.map((lead) => lead.country)),
      ];
    }
    if (isNewSubscription) {
      // Get all current leads
      const { data: currentUserLeads, error: currentLeadsError } =
        await supabase
          .from("user_leads")
          .select("lead_id, user_id, user_email, received_at, is_demo")
          .eq("user_id", userId);

      if (currentUserLeads && currentUserLeads.length > 0) {
        // Prepare history entries for any not already in history
        const { data: alreadyInHistory } = await supabase
          .from("user_leads_history")
          .select("lead_id")
          .eq("user_id", userId);

        const alreadyInHistoryIds = new Set(
          alreadyInHistory?.map((l) => l.lead_id)
        );
        const historyEntries = currentUserLeads
          .filter((l) => !alreadyInHistoryIds.has(l.lead_id))
          .map((l) => ({
            user_id: l.user_id,
            lead_id: l.lead_id,
            user_email: l.user_email,
            received_at: l.received_at,
            is_demo: l.is_demo,
          }));

        if (historyEntries.length > 0) {
          await supabase.from("user_leads_history").insert(historyEntries);
        }

        // Delete all current leads
        await supabase.from("user_leads").delete().eq("user_id", userId);
      }
    }
    // 1. Get all leads that this user has ever received (to avoid duplicates)
    const { data: allUserLeads, error: historyError } = await supabase
      .from("user_leads_history")
      .select("lead_id, is_demo")
      .eq("user_id", userId);
    // 2. Get all leads currently assigned to the user
    const { data: currentUserLeads, error: currentLeadsError } = await supabase
      .from("user_leads")
      .select("lead_id, is_demo")
      .eq("user_id", userId);
    // 3. Exclude only non-demo leads from assignment
    const previouslyReceivedLeadIds =
      allUserLeads?.filter((l) => !l.is_demo).map((lead) => lead.lead_id) || [];
    const currentlyAssignedLeadIds =
      currentUserLeads?.filter((l) => !l.is_demo).map((lead) => lead.lead_id) ||
      [];
    const allExcludedLeadIds = [
      ...new Set([...previouslyReceivedLeadIds, ...currentlyAssignedLeadIds]),
    ];
    // 4. Fetch available leads for preferences
    let allAvailableLeads = [];
    for (const industry of preferences) {
      let query = supabase
        .from("leads")
        .select("id, industry, country")
        .contains("industry", [industry]);
      if (allExcludedLeadIds.length > 0) {
        query = query.not("id", "in", `(${allExcludedLeadIds.join(",")})`);
      }
      query = query.limit(leadCount);
      const { data: industryLeads, error: leadsError } = await query;
      if (industryLeads) {
        allAvailableLeads = [...allAvailableLeads, ...industryLeads];
      }
    }
    // Deduplicate
    const uniqueLeadsMap = new Map();
    allAvailableLeads.forEach((lead) => {
      uniqueLeadsMap.set(lead.id, lead);
    });
    allAvailableLeads = Array.from(uniqueLeadsMap.values()).slice(0, leadCount);
    // 5. Prepare insert
    const userLeadsToInsert = allAvailableLeads.map((lead) => ({
      user_id: userId,
      lead_id: lead.id,
      user_email: userEmail,
      received_at: new Date().toISOString(),
      is_demo: false,
    }));
    // 6. Insert
    if (userLeadsToInsert.length > 0) {
      const { error: insertError } = await supabase
        .from("user_leads")
        .insert(userLeadsToInsert);
      if (insertError) {
        throw new Error(`Failed to insert leads: ${insertError.message}`);
      }
    } else {
      throw new Error(
        "No available leads to assign. Please update your preferences or contact support."
      );
    }
    return {
      success: true,
      assignedLeadsCount: allAvailableLeads.length,
    };
  } catch (error) {
    console.error("Error in assignLeadsToUser:", error);
    return {
      success: false,
      error: error.message,
    };
  }
};

export const simulateSubscriptionExpiration = async (userId) => {
  try {
    const twoMonthsAgo = new Date();
    twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);
    const { error } = await supabase
      .from("profiles")
      .update({
        subscription_timestamp: twoMonthsAgo.toISOString(),
      })
      .eq("id", userId);
    if (error) throw error;
    return await checkSubscriptionExpiration(userId);
  } catch (error) {
    console.error("Error simulating subscription expiration:", error);
    return { error: error.message };
  }
};

export const updateLeadUsedStatus = async (
  leadId,
  status = true,
  table = "user_leads"
) => {
  try {
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();
    if (sessionError) throw sessionError;
    if (!session?.user) throw new Error("No active session");

    const { error: updateError } = await supabase
      .from(table)
      .update({ used: status })
      .eq("user_id", session.user.id)
      .eq("lead_id", leadId);

    if (updateError) throw updateError;
    return { success: true };
  } catch (error) {
    console.error("Error updating lead used status:", error);
    return { success: false, error: error.message };
  }
};

export const assignDemoLeads = async (userId, userEmail, preferences) => {
  try {
    if (!preferences || preferences.length === 0) {
      throw new Error("No preferences selected");
    }
    const { data: existingDemoLeads, error: demoLeadsError } = await supabase
      .from("user_leads")
      .select("id")
      .eq("user_id", userId)
      .eq("is_demo", true);
    if (demoLeadsError) {
      throw new Error("Failed to check for existing demo leads");
    }
    if (existingDemoLeads && existingDemoLeads.length > 0) {
      return {
        success: true,
        assignedLeadsCount: existingDemoLeads.length,
        alreadyAssigned: true,
      };
    }
    const MAX_DEMO_LEADS = 20;
    const numPrefs = preferences.length;
    const baseLeadsPerPref = Math.floor(MAX_DEMO_LEADS / numPrefs);
    let remainder = MAX_DEMO_LEADS % numPrefs;
    const shuffledPrefs = [...preferences].sort(() => Math.random() - 0.5);
    const leadsPerPref = shuffledPrefs.map((pref, idx) =>
      idx < remainder ? baseLeadsPerPref + 1 : baseLeadsPerPref
    );
    let allDemoLeads = [];
    for (let i = 0; i < shuffledPrefs.length; i++) {
      const industry = shuffledPrefs[i];
      const limit = leadsPerPref[i];
      let query = supabase
        .from("leads")
        .select("id, industry")
        .contains("industry", [industry])
        .limit(limit);
      const { data: industryLeads, error: leadsError } = await query;
      if (leadsError) {
        throw new Error(`Failed to fetch demo leads: ${leadsError.message}`);
      }
      if (industryLeads) {
        allDemoLeads = [...allDemoLeads, ...industryLeads];
      }
    }
    const uniqueLeadsMap = new Map();
    allDemoLeads.forEach((lead) => {
      uniqueLeadsMap.set(lead.id, lead);
    });
    const uniqueDemoLeads = Array.from(uniqueLeadsMap.values()).slice(
      0,
      MAX_DEMO_LEADS
    );
    const userLeadsToInsert = uniqueDemoLeads.map((lead) => ({
      user_id: userId,
      lead_id: lead.id,
      user_email: userEmail,
      received_at: new Date().toISOString(),
      is_demo: true,
    }));
    // Also record these leads in history
    const historyEntries = uniqueDemoLeads.map((lead) => ({
      user_id: userId,
      lead_id: lead.id,
      received_at: new Date().toISOString(),
    }));
    // Insert all leads at once
    const { error: insertError } = await supabase
      .from("user_leads")
      .insert(userLeadsToInsert);
    if (insertError) {
      throw new Error(`Failed to insert demo leads: ${insertError.message}`);
    }
    // Record in history
    const { error: historyInsertError } = await supabase
      .from("user_leads_history")
      .insert(historyEntries);
    if (historyInsertError) {
      throw new Error(
        `Failed to insert demo leads: ${historyInsertError.message}`
      );
    }
    // update total count of leads received
    const { data: profile, error: profileFetchError } = await supabase
      .from("profiles")
      .select("total_leads_received")
      .eq("id", userId)
      .single();
    if (profileFetchError) {
      throw new Error(
        `Failed to fetch user profile: ${profileFetchError.message}`
      );
    }
    const currentTotal = profile.total_leads_received || 0;
    const updatedTotal = currentTotal + uniqueDemoLeads.length;
    const { error: updateError } = await supabase
      .from("profiles")
      .update({ total_leads_received: updatedTotal })
      .eq("id", userId);

    if (updateError) {
      throw new Error(
        `Failed to update total leads received: ${updateError.message}`
      );
    }
    return {
      success: true,
      assignedLeadsCount: uniqueDemoLeads.length,
    };
  } catch (error) {
    console.error("Error in assignDemoLeads:", error);
    return {
      success: false,
      error: error.message,
    };
  }
};

export const likeLead = async (leadId) => {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError || !user) {
    throw new Error("User not authenticated");
  }
  const userId = user.id;
  const { data: lead, error: fetchError } = await supabase
    .from("leads")
    .select("likes")
    .eq("id", leadId)
    .single();
  if (fetchError) {
    throw new Error("Failed to fetch lead");
  }
  const currentLikes = lead.likes || [];
  let updatedLikes, status;
  if (currentLikes.includes(userId)) {
    // Unlike: remove userId from likes
    updatedLikes = currentLikes.filter((id) => id !== userId);
    status = "unliked";
  } else {
    // Like: add userId to likes
    updatedLikes = [...currentLikes, userId];
    status = "liked";
  }
  const { error: updateError } = await supabase
    .from("leads")
    .update({ likes: updatedLikes })
    .eq("id", leadId);

  if (updateError) {
    throw new Error("Failed to update likes");
  }
  return { status, likes: updatedLikes };
};

export const addLeadToFavorites = async (leadId) => {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();
  if (authError || !user) throw new Error("Not authenticated");
  const { data: profile, error: fetchError } = await supabase
    .from("profiles")
    .select("favorite_leads")
    .eq("id", user.id)
    .single();
  if (fetchError) throw new Error("Failed to fetch profile");
  const currentFavorites = profile.favorite_leads || [];
  if (currentFavorites.includes(leadId)) return profile;
  const updatedFavorites = [...currentFavorites, leadId];
  const { error: updateError } = await supabase
    .from("profiles")
    .update({ favorite_leads: updatedFavorites })
    .eq("id", user.id);
  if (updateError) throw new Error("Failed to update favorites");
  return { favorite_leads: updatedFavorites };
};

export const removeLeadFromFavorites = async (leadId) => {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();
  if (authError || !user) throw new Error("Not authenticated");
  const { data: profile, error: fetchError } = await supabase
    .from("profiles")
    .select("favorite_leads")
    .eq("id", user.id)
    .single();
  if (fetchError) throw new Error("Failed to fetch profile");
  const updatedFavorites = (profile.favorite_leads || []).filter(
    (id) => id !== leadId
  );
  const { error: updateError } = await supabase
    .from("profiles")
    .update({ favorite_leads: updatedFavorites })
    .eq("id", user.id);
  if (updateError) throw new Error("Failed to remove from favorites");
  return { favorite_leads: updatedFavorites };
};

export const addExtraLeads = async (userId) => {
  try {
    // Get user's preferences, region, and email
    const { data: userProfile, error: profileError } = await supabase
      .from("profiles")
      .select(
        "preferences, region, leads_received_this_month, total_leads_received, email"
      )
      .eq("id", userId)
      .single();

    if (profileError) {
      throw new Error(`Failed to fetch user profile: ${profileError.message}`);
    }

    const preferences = userProfile.preferences || [];
    const regions = userProfile.region || [];
    const userEmail = userProfile.email;
    const EXTRA_LEADS_COUNT = 100;

    if (!preferences || preferences.length === 0) {
      throw new Error(
        "No preferences set. Please set your industry preferences first."
      );
    }

    // Get all leads that this user has ever received (to avoid duplicates)
    const { data: allUserLeads, error: historyError } = await supabase
      .from("user_leads_history")
      .select("lead_id")
      .eq("user_id", userId);

    const previouslyReceivedLeadIds =
      allUserLeads?.map((lead) => lead.lead_id) || [];

    // Fetch all possible leads matching preferences (and region if set), excluding previously received
    let leadsQuery = supabase.from("leads").select("id, industry, country");

    if (regions && regions.length > 0) {
      leadsQuery = leadsQuery.in("country", regions);
    }

    // Exclude previously received leads
    if (previouslyReceivedLeadIds.length > 0) {
      leadsQuery = leadsQuery.not(
        "id",
        "in",
        `(${previouslyReceivedLeadIds.join(",")})`
      );
    }

    // Filter by any of the preferences
    leadsQuery = leadsQuery.or(
      preferences.map((pref) => `industry.cs.{\"${pref}\"}`).join(",")
    );

    // Fetch all matching leads (limit high for safety)
    const { data: allAvailableLeads, error: leadsError } =
      await leadsQuery.limit(500);
    if (leadsError) {
      throw new Error(`Failed to fetch leads: ${leadsError.message}`);
    }

    if (!allAvailableLeads || allAvailableLeads.length === 0) {
      throw new Error("No available leads found for your preferences.");
    }

    // Shuffle the leads for randomness
    const shuffledLeads = allAvailableLeads.sort(() => Math.random() - 0.5);
    // Deduplicate by id (should already be unique, but just in case)
    const uniqueLeadsMap = new Map();
    shuffledLeads.forEach((lead) => {
      uniqueLeadsMap.set(lead.id, lead);
    });
    const finalLeads = Array.from(uniqueLeadsMap.values()).slice(
      0,
      EXTRA_LEADS_COUNT
    );

    // Create user_leads entries
    const userLeadsToInsert = finalLeads.map((lead) => ({
      user_id: userId,
      lead_id: lead.id,
      user_email: userEmail,
      received_at: new Date().toISOString(),
    }));

    // Record in history
    const historyEntries = finalLeads.map((lead) => ({
      user_id: userId,
      lead_id: lead.id,
      received_at: new Date().toISOString(),
    }));

    // Insert all leads at once
    if (userLeadsToInsert.length > 0) {
      const { error: insertError } = await supabase
        .from("user_leads")
        .insert(userLeadsToInsert);
      if (insertError) {
        throw new Error(`Failed to insert leads: ${insertError.message}`);
      }
      // Record in history
      const { error: historyInsertError } = await supabase
        .from("user_leads_history")
        .insert(historyEntries);
      if (historyInsertError) {
        console.error("Error recording lead history:", historyInsertError);
      }
    }

    // Update user's lead counts and reset notification timestamps
    const { error: updateError } = await supabase
      .from("profiles")
      .update({
        leads_received_this_month:
          (userProfile.leads_received_this_month || 0) + finalLeads.length,
        total_leads_received:
          (userProfile.total_leads_received || 0) + finalLeads.length,
        last_notification_timestamp: null,
        last_leads_finished_notification: null,
      })
      .eq("id", userId);

    if (updateError) {
      throw new Error(`Failed to update user profile: ${updateError.message}`);
    }

    return {
      success: true,
      assignedLeadsCount: finalLeads.length,
    };
  } catch (error) {
    console.error("Error in addExtraLeads:", error);
    return {
      success: false,
      error: error.message,
    };
  }
};
