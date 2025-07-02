import supabase from "../config/supabaseClient";

/**
 * Insert an unanswered question into the chat_assistant_stats table
 * @param {string} userId - The user's ID
 * @param {string} userEmail - The user's email
 * @param {string} question - The unanswered question
 */
export async function addUnansweredQuestion(userId, userEmail, question) {
  try {
    const { error } = await supabase.from("chat_assistant_stats").insert([
      {
        user_id: userId,
        user_email: userEmail,
        asked_questions: [question],
      },
    ]);
    if (error) {
      console.error("Error inserting unanswered question:", error);
      return { success: false, error };
    }
    return { success: true };
  } catch (error) {
    console.error("Error in addUnansweredQuestion:", error);
    return { success: false, error };
  }
}
