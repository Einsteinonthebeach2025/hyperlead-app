import supabase from "app/lib/config/supabaseClient";

/**
 * Checks if the current user is an assistant for any boss and returns the boss's userId if so.
 * Otherwise, returns the current user's own id.
 *
 * @param {string} currentUserId - The id of the currently logged-in user
 * @returns {Promise<{ isAssistant: boolean, bossId: string|null, effectiveUserId: string }>}
 */
export async function getEffectiveUserId(currentUserId) {
  // Ensure currentUserEmail is set (should be set globally on login)
  const currentUserEmail = window.currentUserEmail;

  if (!currentUserEmail) {
    console.warn("currentUserEmail is not defined on window.");
    return { isAssistant: false, bossId: null, effectiveUserId: currentUserId };
  }

  // Find any profile where user_assistant array contains the current user's email
  const { data: bossProfiles, error } = await supabase
    .from("profiles")
    .select("id, user_assistant, email")
    .contains("user_assistant", [currentUserEmail]);

  if (error) {
    console.error("Error checking assistant relationship:", error);
    return { isAssistant: false, bossId: null, effectiveUserId: currentUserId };
  }

  if (bossProfiles && bossProfiles.length > 0) {
    const boss = bossProfiles[0];
    return { isAssistant: true, bossId: boss.id, effectiveUserId: boss.id };
  }

  return { isAssistant: false, bossId: null, effectiveUserId: currentUserId };
}
