function generateEmailHTML(subject, message, sender) {
  return `
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${subject}</title>
  <!-- Plain text fallback -->
  <!-- ${subject} | ${message.replace(/<[^>]+>/g, "")} | From: ${sender} -->
</head>

<body style="margin: 0; padding: 0; width: 100%;">
  <table width="100%" height="100%" cellpadding="0" cellspacing="0" style="width: 100%; max-width: 100%; background-color: #ffffff;">
    <tr>
      <td align="center" style="padding: 20px; width: 100%; background-color: #e5e5e5;">
        <img src="https://hyperlead-application.vercel.app/assets/icon.png" alt="welcome" style="width: 40px; height: 40px; display: block;" />
        <h1 style="font-size: 24px; font-weight: bold; margin: 10px 0 0; color: black;">Hyperlead</h1>
      </td>
    </tr>

    <tr>
      <td style="padding: 20px; text-align: left; vertical-align: top;">
        <div style="min-height: 300px; max-width: 100%;">
          <h2 style="font-size: 22px; font-weight: bold; margin: 0 0 10px; text-transform: capitalize; padding-bottom: 10px; border-bottom: 1px solid #e5e5e5; color: black">
            ${subject}
          </h2>
          <p style="font-size: 14px; margin: 0; color: #545252; line-height: 1.5;">${message}</p>
        </div>
      </td>
    </tr>

    <tr>
      <td align="center" style="background-color: #e5e5e5; padding: 20px;">
        <table cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 10px;">
          <tr>
            <td>
              <a href="https://hyperlead-application.vercel.app" style="text-decoration: none;">
                <img src="https://cdn-icons-png.flaticon.com/512/145/145807.png" alt="LinkedIn"
                  style="width: 24px; height: 24px; margin-right: 8px;" />
              </a>
            </td>
            <td>
              <a href="https://hyperlead-application.vercel.app" style="text-decoration: none;">
                <img src="https://cdn-icons-png.flaticon.com/512/145/145812.png" alt="Twitter"
                  style="width: 24px; height: 24px;" />
              </a>
            </td>
          </tr>
        </table>

        <a href="https://hyperlead-application.vercel.app"
          style="font-size: 14px; color: blue; text-decoration: underline;">Visit our page</a>

        <p style="font-size: 12px; font-weight: bold; margin-top: 10px; color: black;">
          © ${new Date().getFullYear()} Hyperlead App. All rights reserved.
        </p>

        <p style="font-size: 12px; margin-top: 8px; color: #333;">
          Sent by: <strong>${sender}</strong>
        </p>
      </td>
    </tr>
  </table>
</body>

</html>
  `;
}

export default generateEmailHTML;
