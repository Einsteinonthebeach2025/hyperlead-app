TODO LIST

adam@redcircle.com ---> graphchiqovani@yahoo.com
kaisa@marketer.tech ---> grapchiqovani@gmail.com

revise PASSWORD RESET database storing
check email sequence in 48 hours

- რამე თესლი ლოადინგ ანიმაციაა საჭირო /auth/callback და მსგავსი ლოადინგებისთვის

1. USER REGISTRATION

- [x] CREATE USER (Email, UserName, Password)
- [x] GOOGLE authentication
- [x] After creation, navigate user to PREFERENCES page
- [x] Updating PREFERENCES will give 20 random lead from each industry
- [x] After PREFERENCES, navigate user to REGION page to choose region for getting leads accordingly
- [x] SIGN IN USER
- [x] RESET PASSWORD
- [x] UPDATE PASSWORD using verified link

2. MY PROFILE PAGE

- [x] User can upload profile picture, if current user's image exists in database, it should be replaced
- [x] User can update his own profile information. Real time update for the UI
- [x] User can set wallpaper image and store imageURL to database
- [x] UPDATE PASSWORD using verified link

3. DASHBOARD LEAD MANAGEMENT

- [x] Assign leads to user based on subscription plan
- [x] Assign leads to user based on their PREFERENCES and REGION
- [x] Filter leads based on COUNTRIES, EMPLOYEES, INDUSTRIES, CITIES, SENIORITY LEVELS
- [x] Search leads based on all properties
- [x] Send EMAIL to leads / multiple leads simultaneously
- [x] Update lead status to USED/UNUSED on click and on MARK icon click
- [x] Paginate leads

4. DASHBOARD ANALYTICS

- [x] Basic analytics (Current plan, monthly leads, monthly received leads, total received leads)
- [x] User's lead analytics, USED, REMAINING, TOTAL
- [x] Email statistics, SENT, OPENED, DELIVERED, OPEN RATE, DELIVERY RATE
- [x] User's top 5 lead analitycs based on their employee count
- [x] User's lead statistic based on COUNTRY
- [x] Current lead statistics based on INDUSTRY

5. DASHBOARD EMAIL ANALYTICS

- [x] Fetch users sent emails
- [x] Email card includes (RECIPIENT NAME, SUBJECT, MESSAGE, SENT DATE, COMPANY NAME, DELIVERED, OPENED, LINKEDIN URL)
- [x] Email has delete button and delete animation
- [x] Sort emails by month, delivered status, opened status,
- [x] Search emails by subject name and company title
- [ ] Each 3 month's old email will be removed (optional)

6. NOTIFICATION / REPORTING list

- [x] NOTIFY USER: After successful registration
- [x] NOTIFY USER: Your password was changed successfully. (with date data)
- [x] NOTIFY USER: After using 80% of leads
- [x] NOTIFY USER: After every successful subscription
- [x] NOTIFY USER: 5 days before subscription expiration
- [x] NOTIFY USER: About fixed bug he reported
- [x] NOTIFY USER: When subscription is out
- [x] NOTIFY USER: When someone wants to add him/her as an assistant
- [ ] NOTIFY USER: After adding set of LEADS to the database (GLOBAL)
- [ ] NOTIFY USER: About every new feature is added to application (GLOBAL)
- [x] USER can report any bug and updates reported bugs count in database (reported_bugs field)
- [x] USER can give feedback with star rating
- [x] USER feedbacks first goes to admin panel with buttons APPROVED / DECLINED

7. SHARING LEADS MANAGEMENT

- [x] Users can add other users as their assistants using emails
- [x] Assistants can see "BOSSES" data in his/her dashboard
- [x] Assistants can toggle dashboard between boss's and own data

8. ADMINISTRATION PANEL

- [x] Admin panel has navigation bar (BUGS, USERS, FEEDBACKS)
- [x] BUGS: Each card has DELETE button and ACTION button (Action button sends notification to reporter with some fixed bug text)
- [x] FEEDBACKS: feedbacks are either approved or deleted
- [x] USER MANAGEMENT: all users with neccessary data in it
- [x] Admin can send a NOTIFICATIONS or EMAILS to all users or to a single user
- [ ] Admin can STOP subscription for any user
- [x] ANALYTICS: Total Users count with statistics graph
- [x] ANALYTICS: Weekly users count comparison vs last week
- [x] ANALYTICS: Based on country
