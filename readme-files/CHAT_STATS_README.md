# Chat Assistant Statistics System

This system tracks questions that the chatbot couldn't answer properly, helping you improve the `chatknowledge.js` file by identifying common unanswered questions.

## Database Setup

### 1. Run the Migration

Execute the SQL migration file to create the `chat_assistant_stats` table:

```bash
# If using Supabase CLI
supabase db push

# Or manually run the SQL in your Supabase dashboard
```

### 2. Table Structure

The `chat_assistant_stats` table contains:

- `id`: Unique identifier
- `user_id`: References auth.users(id)
- `user_email`: User's email address
- `asked_questions`: Array of questions the chatbot couldn't answer
- `created_at`: When the record was created
- `updated_at`: When the record was last updated

## How It Works

### 1. Question Tracking

The system automatically tracks questions when:

- The chatbot returns an empty/null response
- The response contains rejection keywords like "sorry", "can't help", "only help", etc.

### 2. Detection Logic

In `app/api/chatbot/route.js`, the system checks for:

```javascript
const rejectionKeywords = [
  "sorry",
  "can't help",
  "only help",
  "related to",
  "not able",
  "unfortunately",
  "don't have",
  "not available",
];
```

### 3. Data Storage

Questions are stored using the `add_chat_question` PostgreSQL function, which:

- Creates a new record if the user doesn't exist
- Appends the question to the existing array if the user already has a record

## Usage

### 1. View Statistics (Admin)

Navigate to the admin panel to view:

- Total users with questions
- Total unanswered questions
- Average questions per user
- Top 10 most frequently asked questions
- Detailed view of all user questions

### 2. Improve Chatbot Knowledge

Use the statistics to:

1. Identify common questions that need answers
2. Add new triggers and answers to `chatknowledge.js`
3. Improve the chatbot's response quality

### 3. API Functions

```javascript
// Add an unanswered question
import { addUnansweredQuestion } from "app/lib/actions/chatStatsActions";
await addUnansweredQuestion(userId, userEmail, question);

// Get user's chat stats
import { getUserChatStats } from "app/lib/actions/chatStatsActions";
const stats = await getUserChatStats(userId);

// Get all stats (admin only)
import { getAllChatStats } from "app/lib/actions/chatStatsActions";
const allStats = await getAllChatStats();

// Get summary statistics
import { getChatStatsSummary } from "app/lib/actions/chatStatsActions";
const summary = await getChatStatsSummary();
```

## Security

- Row Level Security (RLS) is enabled
- Users can only view their own statistics
- Admins can view all statistics
- All database operations are properly secured

## Customization

### 1. Modify Rejection Keywords

Update the `rejectionKeywords` array in `app/api/chatbot/route.js` to match your chatbot's rejection patterns.

### 2. Add More Detection Logic

You can add more sophisticated detection logic, such as:

- Sentiment analysis
- Confidence scores from AI responses
- Manual flagging by users

### 3. Export Data

The system provides aggregated data that you can export for analysis in external tools.

## Future Enhancements

1. **Question Categorization**: Automatically categorize questions by topic
2. **Response Quality Metrics**: Track user satisfaction with responses
3. **Auto-Improvement**: Automatically suggest new knowledge base entries
4. **Integration**: Connect with external analytics tools
5. **Notifications**: Alert admins when certain questions are asked frequently

## Troubleshooting

### Common Issues

1. **Questions not being tracked**: Check if `userId` and `userEmail` are being passed correctly
2. **Permission errors**: Ensure RLS policies are properly configured
3. **Database connection**: Verify Supabase credentials are correct

### Debug Mode

Add console logs in the chatbot API to debug tracking:

```javascript
console.log("Tracking question:", { userId, userEmail, message, isRejection });
```
