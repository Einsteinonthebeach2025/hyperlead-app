import supabase from "../config/supabaseClient";
import { getCurrentUser } from "./notificationActions";

export const submitFeedback = async (feedbackData) => {
  try {
    const user = await getCurrentUser();
    const { data, error } = await supabase
      .from("feedback")
      .insert([
        {
          user_id: user.id,
          rating: feedbackData.rating,
          header: feedbackData.header,
          review: feedbackData.review,
        },
      ])
      .select()
      .single();
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
};

export const getFeedback = async () => {
  try {
    const { data, error } = await supabase
      .from("feedback")
      .select(
        `
        *,
        profiles:user_id (
          id,
          userName,
          email,
          avatar_url
        )
      `
      )
      .eq("status", "approved")
      .order("created_at", { ascending: false });
    if (error) throw error;
    // Transform the data to flatten the profile information
    const transformedData = data?.map((feedback) => ({
      ...feedback,
      userName: feedback?.profiles?.userName || "Anonymous User",
      email: feedback?.profiles?.email || null,
      avatar_url: feedback?.profiles?.avatar_url || null,
    }));
    return {
      data: transformedData || [],
      error: null,
    };
  } catch (error) {
    return {
      data: [],
      error: error.message,
    };
  }
};

export const deleteFeedback = async (id) => {
  try {
    const { data, error } = await supabase
      .from("feedback")
      .delete()
      .eq("id", id);
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
};

export const updateFeedback = async (id, status) => {
  try {
    const { data, error } = await supabase
      .from("feedback")
      .update({ status })
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
};

export const submitBug = async (bugData) => {
  try {
    const user = await getCurrentUser();
    const { data, error } = await supabase
      .from("bug_reports")
      .insert([
        {
          user_id: user.id,
          user_email: user.email,
          header: bugData.header,
          message: bugData.message,
        },
      ])
      .select()
      .single();
    if (error) throw error;

    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("reported_bugs")
      .eq("id", user.id)
      .single();
    if (profileError) throw profileError;

    const { error: updateError } = await supabase
      .from("profiles")
      .update({
        reported_bugs: (profileData?.reported_bugs || 0) + 1,
      })
      .eq("id", user.id);
    if (updateError) throw updateError;

    return { data, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
};

export const deleteBug = async (id) => {
  try {
    const { data, error } = await supabase
      .from("bug_reports")
      .delete()
      .eq("id", id);
    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err) {
    return { success: false, error: "Unexpected error occurred" };
  }
};
