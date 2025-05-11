import supabase from "../config/supabaseClient";

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
