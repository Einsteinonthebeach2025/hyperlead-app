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
        <a href="https://www.hyperlead.net" style="text-decoration: none;">
          <div style="background-color: #000000; border-radius: 15px; display: inline-block; padding: 8px 24px;">
            <span style="font-size: 14px; color: #ffffff; font-weight: bold;">GO TO HYPERLEAD</span>
          </div>
        </a>
        <p style="font-size: 12px; margin-top: 10px; color: black;">
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
