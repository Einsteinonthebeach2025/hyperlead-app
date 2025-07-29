import supabase from "../config/supabaseClient";

const getMonthStart = () => {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
};

export const assignLeadsToUser = async (
  userId,
  userEmail,
  preferences,
  leadCount,
  isNewSubscription = false,
  supabaseClient = supabase,
  planLeads,
  subscriptionType
) => {
  try {
    const {
      data: { session },
      error: authError,
    } = await supabaseClient.auth.getSession();
    if (authError) {
      throw new Error(`Authentication error: ${authError.message}`);
    }
    if (!preferences || preferences.length === 0) {
      throw new Error(
        "No preferences set. Please set your industry preferences first."
      );
    }
    const now = new Date().toISOString();
    const { data: userProfile, error: profileError } = await supabaseClient
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
      const { data: availableLeads, error: leadsError } = await supabaseClient
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
      // 1. Get all current leads
      const { data: currentUserLeads, error: currentLeadsError } =
        await supabaseClient
          .from("user_leads")
          .select("lead_id, user_id, user_email, received_at, is_demo")
          .eq("user_id", userId);

      if (currentUserLeads && currentUserLeads.length > 0) {
        // 2. Prepare history entries for any not already in history
        const { data: alreadyInHistory } = await supabaseClient
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
            user_email: userEmail,
            received_at: l.received_at,
            is_demo: l.is_demo,
          }));

        if (historyEntries.length > 0) {
          const { error: insertHistoryError } = await supabaseClient
            .from("user_leads_history")
            .insert(historyEntries);
          if (insertHistoryError) {
            throw new Error(
              `Failed to insert into user_leads_history: ${insertHistoryError.message}`
            );
          }
        }
        // 3. Delete all current leads
        await supabaseClient.from("user_leads").delete().eq("user_id", userId);
      }
    }
    // 1. Get all leads that this user has ever received (to avoid duplicates)
    const { data: allUserLeads, error: historyError } = await supabaseClient
      .from("user_leads_history")
      .select("lead_id, is_demo")
      .eq("user_id", userId);
    // 2. Get all leads currently assigned to the user
    const { data: currentUserLeads, error: currentLeadsError } =
      await supabaseClient
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
    // Calculate how many leads per preference
    const numPrefs = preferences.length;
    const baseLeadsPerPref = Math.floor(leadCount / numPrefs);
    let remainder = leadCount % numPrefs;
    // Shuffle preferences for fairness
    const shuffledPrefs = [...preferences].sort(() => Math.random() - 0.5);
    const leadsPerPref = shuffledPrefs.map((pref, idx) =>
      idx < remainder ? baseLeadsPerPref + 1 : baseLeadsPerPref
    );
    for (let i = 0; i < shuffledPrefs.length; i++) {
      const industry = shuffledPrefs[i];
      const limit = leadsPerPref[i];
      let query = supabaseClient
        .from("leads")
        .select("id, industry, country")
        .contains("industry", [industry]);

      // Filter by region if user has region preferences
      if (hasRegionPreferences && userProfile.region.length > 0) {
        query = query.in("country", userProfile.region);
      }

      const { data: industryLeads, error: leadsError } =
        await query.limit(2000);
      if (leadsError) {
        throw new Error(
          `Failed to fetch leads for ${industry}: ${leadsError.message}`
        );
      }

      // Filter out already assigned leads in JS
      const filteredLeads = industryLeads
        .filter((lead) => !allExcludedLeadIds.includes(lead.id))
        .slice(0, limit);

      allAvailableLeads = [...allAvailableLeads, ...filteredLeads];
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
      const { error: insertError } = await supabaseClient
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
    // 4. Update total_leads_received (increment, not overwrite) and other fields
    const { data: profile, error: profileFetchError } = await supabaseClient
      .from("profiles")
      .select("total_leads_received, monthly_leads, leads_received_this_month")
      .eq("id", userId)
      .single();
    if (profileFetchError) {
      throw new Error(
        `Failed to fetch user profile: ${profileFetchError.message}`
      );
    }
    const currentTotal = profile.total_leads_received || 0;
    const updatedTotal = currentTotal + allAvailableLeads.length;
    const currentLeadsReceivedThisMonth =
      profile.leads_received_this_month || 0;
    // planLeads should be passed in from the caller (the plan's lead count)
    const updatedProfileFields = {
      total_leads_received: updatedTotal,
      monthly_leads: planLeads,
      leads_received_this_month:
        currentLeadsReceivedThisMonth + allAvailableLeads.length,
      last_leads_finished_notification: null,
      last_notification_timestamp: null,
      subscription_status: "active",
      subscription_timestamp: now,
      subscription_type: subscriptionType,
    };
    const { error: updateError } = await supabaseClient
      .from("profiles")
      .update(updatedProfileFields)
      .eq("id", userId);

    if (updateError) {
      throw new Error(`Failed to update user profile: ${updateError.message}`);
    }

    // After successfully assigning new leads, update historical demo leads to be part of history
    const { error: updateHistoryError } = await supabaseClient
      .from("user_leads_history")
      .update({ is_demo: false })
      .eq("user_id", userId)
      .eq("is_demo", true);

    if (updateHistoryError) {
      // Log the error but don't fail the entire process, as leads have been assigned.
      console.error(
        `Failed to update demo lead status in history for user ${userId}:`,
        updateHistoryError.message
      );
    }

    // Reset unlocked_leads_count for new subscriptions to give fresh monthly limit
    if (isNewSubscription) {
      const { error: resetUnlockError } = await supabaseClient
        .from("profiles")
        .update({ unlocked_leads_count: 0 })
        .eq("id", userId);
      if (resetUnlockError) {
        // Log the error but don't fail the entire process, as leads have been assigned.
        console.error(
          `Failed to reset unlocked_leads_count for user ${userId}:`,
          resetUnlockError.message
        );
      }
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
      user_email: userEmail,
      received_at: new Date().toISOString(),
      is_demo: true,
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

export const addExtraLeads = async (userId, supabaseClient = supabase) => {
  try {
    // Get user's preferences, region, and email
    const { data: userProfile, error: profileError } = await supabaseClient
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

    console.log(`[addExtraLeads] Starting assignment for user ${userId}`);
    console.log(`[addExtraLeads] Preferences: ${preferences.join(", ")}`);
    console.log(`[addExtraLeads] Regions: ${regions.join(", ")}`);

    if (!preferences || preferences.length === 0) {
      throw new Error(
        "No preferences set. Please set your industry preferences first."
      );
    }

    // Get all leads that this user has ever received (to avoid duplicates)
    const { data: allUserLeads, error: historyError } = await supabaseClient
      .from("user_leads_history")
      .select("lead_id")
      .eq("user_id", userId);
    if (historyError) {
      throw new Error(`Failed to fetch lead history: ${historyError.message}`);
    }

    const { data: currentUserLeads, error: currentLeadsError } =
      await supabaseClient
        .from("user_leads")
        .select("lead_id")
        .eq("user_id", userId);
    if (currentLeadsError) {
      throw new Error(
        `Failed to fetch current leads: ${currentLeadsError.message}`
      );
    }

    const previouslyReceivedLeadIds =
      allUserLeads?.map((lead) => lead.lead_id) || [];
    const currentlyAssignedLeadIds =
      currentUserLeads?.map((lead) => lead.lead_id) || [];
    const allExcludedLeadIds = [
      ...new Set([...previouslyReceivedLeadIds, ...currentlyAssignedLeadIds]),
    ];

    console.log(
      `[addExtraLeads] Excluded lead IDs count: ${allExcludedLeadIds.length}`
    );
    console.log(
      `[addExtraLeads] Previously received leads: ${previouslyReceivedLeadIds.length}`
    );
    console.log(
      `[addExtraLeads] Currently assigned leads: ${currentlyAssignedLeadIds.length}`
    );

    // Debug: Check if we have any leads available at all
    const { data: totalLeads, error: totalLeadsError } = await supabaseClient
      .from("leads")
      .select("id, industry, country")
      .limit(1);

    if (totalLeadsError) {
      console.error(
        `[addExtraLeads] Error checking total leads: ${totalLeadsError.message}`
      );
    } else {
      console.log(
        `[addExtraLeads] Total leads in database: ${totalLeads?.length || 0} (sample check)`
      );
    }

    // Debug: Check leads for specific industries
    for (const industry of preferences) {
      let industryQuery = supabaseClient
        .from("leads")
        .select("id, industry, country")
        .contains("industry", [industry]);

      if (regions && regions.length > 0) {
        industryQuery = industryQuery.in("country", regions);
      }

      const { data: industryLeads, error: industryError } =
        await industryQuery.limit(5);

      if (industryError) {
        console.error(
          `[addExtraLeads] Error checking ${industry} leads: ${industryError.message}`
        );
      } else {
        console.log(
          `[addExtraLeads] ${industry} leads available (sample): ${industryLeads?.length || 0}`
        );
        if (industryLeads && industryLeads.length > 0) {
          console.log(
            `[addExtraLeads] ${industry} sample countries:`,
            industryLeads.map((l) => l.country)
          );
        }
      }
    }

    // Simple lead assignment system (similar to assignLeadsToUser)
    const shuffledPrefs = [...preferences].sort(() => Math.random() - 0.5);
    const numPrefs = shuffledPrefs.length;
    const baseLeadsPerPref = Math.floor(EXTRA_LEADS_COUNT / numPrefs);
    let remainder = EXTRA_LEADS_COUNT % numPrefs;

    // Calculate target leads per preference
    const leadsPerPref = shuffledPrefs.map((pref, idx) =>
      idx < remainder ? baseLeadsPerPref + 1 : baseLeadsPerPref
    );

    console.log(
      `[addExtraLeads] Target leads per preference: ${leadsPerPref.join(", ")}`
    );

    // Track assigned leads per preference
    const assignedPerPref = new Array(shuffledPrefs.length).fill(0);
    let allAvailableLeads = [];

    // Fetch and assign leads for each preference
    for (let i = 0; i < shuffledPrefs.length; i++) {
      const industry = shuffledPrefs[i];
      const limit = leadsPerPref[i];

      let query = supabaseClient
        .from("leads")
        .select("id, industry, country")
        .contains("industry", [industry]);

      if (regions && regions.length > 0) {
        query = query.in("country", regions);
      }

      const { data: industryLeads, error: leadsError } =
        await query.limit(2000);

      if (leadsError) {
        console.error(
          `Failed to fetch extra leads for ${industry}: ${leadsError.message}`
        );
        continue;
      }

      console.log(
        `[addExtraLeads] ${industry}: Found ${industryLeads?.length || 0} leads before filtering`
      );

      // Filter out already assigned leads in JS (same as assignLeadsToUser)
      const filteredLeads = industryLeads
        .filter((lead) => !allExcludedLeadIds.includes(lead.id))
        .slice(0, limit);

      console.log(
        `[addExtraLeads] ${industry}: After filtering excluded leads: ${filteredLeads.length} available`
      );

      assignedPerPref[i] = filteredLeads.length;
      allAvailableLeads = [...allAvailableLeads, ...filteredLeads];

      console.log(
        `[addExtraLeads] ${industry}: ${filteredLeads.length}/${limit} leads assigned`
      );
    }

    // Deduplicate and slice to ensure correct count (same as assignLeadsToUser)
    const uniqueLeadsMap = new Map();
    allAvailableLeads.forEach((lead) => {
      uniqueLeadsMap.set(lead.id, lead);
    });
    const finalLeads = Array.from(uniqueLeadsMap.values()).slice(
      0,
      EXTRA_LEADS_COUNT
    );

    console.log(
      `[addExtraLeads] Final result: ${finalLeads.length} leads assigned out of ${EXTRA_LEADS_COUNT} requested`
    );
    console.log(
      `[addExtraLeads] Assignment summary:`,
      shuffledPrefs.map((pref, idx) => ({
        industry: pref,
        assigned: assignedPerPref[idx],
        requested: leadsPerPref[idx],
      }))
    );

    if (finalLeads.length === 0) {
      // Provide more detailed error information
      const assignedSummary = shuffledPrefs
        .map(
          (pref, idx) => `${pref}: ${assignedPerPref[idx]}/${leadsPerPref[idx]}`
        )
        .join(", ");

      throw new Error(
        `No available leads found for your preferences. ` +
          `Requested: ${EXTRA_LEADS_COUNT} leads. ` +
          `Assigned per preference: ${assignedSummary}. ` +
          `Please try updating your industry preferences or contact support if this issue persists.`
      );
    }

    // Create user_leads entries
    const userLeadsToInsert = finalLeads.map((lead) => ({
      user_id: userId,
      lead_id: lead.id,
      user_email: userEmail,
      received_at: new Date().toISOString(),
      is_demo: false,
      is_extra: true,
    }));

    // Insert all leads at once
    if (userLeadsToInsert.length > 0) {
      const { error: insertError } = await supabaseClient
        .from("user_leads")
        .insert(userLeadsToInsert);
      if (insertError) {
        throw new Error(`Failed to insert leads: ${insertError.message}`);
      }
    }

    // Update user's lead counts and reset notification timestamps
    const { error: updateError } = await supabaseClient
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
      requestedLeadsCount: EXTRA_LEADS_COUNT,
      assignedPerPreference: shuffledPrefs.map((pref, idx) => ({
        industry: pref,
        assigned: assignedPerPref[idx],
        requested: leadsPerPref[idx],
      })),
    };
  } catch (error) {
    console.error("Error in addExtraLeads:", error);
    return {
      success: false,
      error: error.message,
    };
  }
};

export const hyperSearchLeads = async (query) => {
  if (!query || query.length < 2) {
    return { success: true, data: [] };
  }

  try {
    const { data, error } = await supabase
      .from("leads")
      .select(
        "id, first_name, last_name, person_title, company_title, seniority, industry, country"
      )
      .ilike("company_title", `%${query}%`)
      .limit(20);
    if (error) {
      console.error("Error during hyper search:", error);
      throw error;
    }
    return { success: true, data };
  } catch (error) {
    console.error("Error in hyperSearchLeads:", error);
    return { success: false, error: error.message };
  }
};

export const unlockingLeads = async (leadId, userId, userEmail) => {
  try {
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("subscription")
      .eq("id", userId)
      .single();
    if (profileError) throw profileError;
    const subscription = profile?.subscription;
    let maxUnlocks = 0;
    if (subscription === "PLUS") maxUnlocks = 5;
    else if (subscription === "PRO") maxUnlocks = 15;
    else if (subscription === "HYPER") maxUnlocks = 30;
    else maxUnlocks = 0;
    const monthStart = getMonthStart();
    // 2. Count how many leads this user has unlocked this month
    const { data: unlockedThisMonth, error: countError } = await supabase
      .from("unlocked_leads")
      .select("id", { count: "exact" })
      .eq("user_id", userId)
      .gte("unlocked_at", monthStart);
    if (countError) throw countError;
    if (unlockedThisMonth.length >= maxUnlocks) {
      return {
        success: false,
        error: `You have reached your monthly unlock limit (${maxUnlocks}).`,
      };
    }
    // Insert into unlocked_leads
    const { data, error } = await supabase
      .from("unlocked_leads")
      .insert([
        {
          lead_id: leadId,
          user_id: userId,
          user_email: userEmail,
        },
      ])
      .select()
      .single();
    if (error) throw error;
    // Increment unlocked_leads_count in profiles
    if (data) {
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("unlocked_leads_count")
        .eq("id", userId)
        .single();
      if (profileError) throw profileError;
      const currentCount = profile?.unlocked_leads_count
        ? Number(profile.unlocked_leads_count)
        : 0;
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ unlocked_leads_count: currentCount + 1 })
        .eq("id", userId);
      if (updateError) throw updateError;
    }
    // Notify user
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getUnlockedLeads = async (userId) => {
  try {
    const { data, error } = await supabase
      .from("unlocked_leads")
      .select("lead_id")
      .eq("user_id", userId);

    if (error) throw error;

    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
