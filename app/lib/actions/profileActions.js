import supabase from "../config/supabaseClient";

export const updateProfile = async (userId, updates) => {
  try {
    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .update(updates)
      .eq("id", userId)
      .select()
      .single();
    if (profileError) throw profileError;
    if (updates.userName || updates.phone) {
      const authUpdates = {};
      if (updates.userName) authUpdates.display_name = updates.userName;
      if (updates.phone) authUpdates.phone = updates.phone;
      const { error: authError } = await supabase.auth.updateUser({
        data: authUpdates,
      });
      if (authError) throw authError;
    }
    return { data: profileData, error: null };
  } catch (error) {
    console.error("Error updating profile:", error);
    return { data: null, error: error.message };
  }
};

export const uploadAvatar = async (userId, file) => {
  try {
    const { data: existingProfile } = await supabase
      .from("profiles")
      .select("avatar_url")
      .eq("id", userId)
      .single();
    if (existingProfile?.avatar_url) {
      const oldPath = existingProfile.avatar_url.split("/").pop();
      await supabase.storage.from("avatars").remove([`${userId}/${oldPath}`]);
    }
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `${userId}/${fileName}`;
    const { data, error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: true,
      });
    if (uploadError) throw uploadError;
    const {
      data: { publicUrl },
    } = supabase.storage.from("avatars").getPublicUrl(filePath);
    const { error: updateError } = await supabase
      .from("profiles")
      .update({ avatar_url: publicUrl })
      .eq("id", userId);
    if (updateError) throw updateError;
    return { success: true, avatar_url: publicUrl };
  } catch (error) {
    console.error("Error uploading avatar:", error);
    return { success: false, error: error.message };
  }
};

export const addAssistantToUser = async (
  userId,
  assistantEmail,
  notificationId,
  bossName
) => {
  try {
    const { data: assistantUser } = await supabase
      .from("profiles")
      .select("id, email")
      .eq("email", assistantEmail)
      .single();
    if (!assistantUser) {
      return { success: false, error: "This user does not exist." };
    }
    const { data: currentUserProfile, error: profileError } = await supabase
      .from("profiles")
      .select("user_assistant")
      .eq("id", userId)
      .single();
    if (profileError) {
      return { success: false, error: "Could not fetch your profile." };
    }
    let assistants = currentUserProfile?.user_assistant || [];
    if (assistants.includes(assistantEmail)) {
      return { success: false, error: "This assistant is already added." };
    }
    assistants = [...assistants, assistantEmail];
    const { error: updateError } = await supabase
      .from("profiles")
      .update({ user_assistant: assistants })
      .in("id", [userId]);
    if (updateError) {
      return { success: false, error: "Failed to add assistant." };
    }
    const { error: updateAssistantError } = await supabase
      .from("profiles")
      .update({ is_assistant: true })
      .eq("id", assistantUser.id);
    if (updateAssistantError) {
      console.error("Failed to update assistant status:", updateAssistantError);
      return { success: false, error: "Failed to mark user as assistant." };
    }
    if (notificationId) {
      await supabase
        .from("notifications")
        .update({
          read: true,
          type: "accept_assistancy",
          message: `You have accepted ${bossName} assistancy request. You can check dashboard.`,
        })
        .eq("id", notificationId);
    }
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message || "Unknown error" };
  }
};

export const removeAssistantFromUser = async (userId, assistantEmail) => {
  try {
    const { data: currentUserProfile, error: profileError } = await supabase
      .from("profiles")
      .select("user_assistant, userName")
      .eq("id", userId)
      .single();
    if (profileError) {
      return { success: false, error: "Could not fetch your profile." };
    }

    const { data: assistantProfile, error: assistantError } = await supabase
      .from("profiles")
      .select("id, email")
      .eq("email", assistantEmail)
      .single();
    if (assistantError) {
      return { success: false, error: "Could not fetch assistant profile." };
    }

    const { error: updateError } = await supabase
      .from("profiles")
      .update({ user_assistant: null })
      .eq("id", userId);
    if (updateError) {
      return { success: false, error: "Failed to remove assistant." };
    }

    const { error: updateAssistantError } = await supabase
      .from("profiles")
      .update({ is_assistant: false })
      .eq("id", assistantProfile.id);
    if (updateAssistantError) {
      return { success: false, error: "Failed to update assistant status." };
    }

    const { error: notificationError } = await supabase
      .from("notifications")
      .insert({
        user_id: assistantProfile.id,
        type: "REMOVE_ASSISTANT",
        message: `${currentUserProfile.userName} has removed you from his assistants.`,
        read: false,
      });
    if (notificationError) {
      console.error("Failed to create notification:", notificationError);
    }

    return { success: true };
  } catch (error) {
    console.error("Error removing assistant:", error);
    return { success: false, error: error.message || "Unknown error" };
  }
};
