import supabase from "app/lib/config/supabaseClient";
import { store } from "app/lib/store/store";
import { cookies } from "next/headers";

/**
 * Checks if the current user is an assistant for any boss and returns the boss's userId if so.
 * Otherwise, returns the current user's own id.
 *
 * @param {string} currentUserId - The id of the currently logged-in user
 * @param {string} currentUserEmail - The email of the currently logged-in user
 * @returns {Promise<{ isAssistant: boolean, bossId: string|null, effectiveUserId: string }>}
 */
export async function getEffectiveUserId(currentUserId, currentUserEmail) {
  if (!currentUserEmail) {
    console.warn("currentUserEmail is not provided.");
    return { isAssistant: false, bossId: null, effectiveUserId: currentUserId };
  }

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

    // Check if we're in a browser environment
    if (typeof window !== "undefined") {
      // Client-side: use Redux state
      const state = store.getState();
      const viewBossData = state.dashboard.viewBossData;
      return {
        isAssistant: true,
        bossId: boss.id,
        effectiveUserId: viewBossData ? boss.id : currentUserId,
      };
    } else {
      // Server-side: use cookies
      const cookieStore = await cookies();
      const viewBossData = cookieStore.get("viewBossData")?.value === "true";
      return {
        isAssistant: true,
        bossId: boss.id,
        effectiveUserId: viewBossData ? boss.id : currentUserId,
      };
    }
  }

  return { isAssistant: false, bossId: null, effectiveUserId: currentUserId };
}
