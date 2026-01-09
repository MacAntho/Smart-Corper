
export const getEmailBase = (content: string) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Inter', Helvetica, Arial, sans-serif; background-color: #f9fafb; margin: 0; padding: 20px; color: #111827; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 24px; overflow: hidden; border: 1px solid #f3f4f6; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); }
    .header { background: #10B981; padding: 40px 20px; text-align: center; }
    .logo { background: #ffffff; color: #10B981; width: 48px; height: 48px; line-height: 48px; border-radius: 12px; display: inline-block; font-weight: 900; font-size: 24px; margin-bottom: 12px; }
    .header-title { color: #ffffff; font-size: 24px; font-weight: 800; margin: 0; letter-spacing: -0.025em; }
    .content { padding: 40px; line-height: 1.6; font-size: 16px; color: #4b5563; }
    .footer { padding: 30px; text-align: center; font-size: 12px; color: #9ca3af; border-top: 1px solid #f3f4f6; }
    .btn { display: inline-block; padding: 16px 32px; background: #10B981; color: #ffffff; text-decoration: none; border-radius: 14px; font-weight: 700; margin: 20px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em; }
    .badge { display: inline-block; padding: 4px 12px; background: #ecfdf5; color: #059669; border-radius: 999px; font-size: 11px; font-weight: 800; text-transform: uppercase; margin-bottom: 8px; }
    h2 { color: #111827; font-weight: 800; font-size: 20px; margin-top: 0; }
    ul { padding-left: 20px; }
    li { margin-bottom: 10px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">N</div>
      <h1 class="header-title">SmartCorper</h1>
    </div>
    <div class="content">
      ${content}
    </div>
    <div class="footer">
      <p>&copy; 2024 NYSC Smart Companion. Built for Nigerian Excellence.</p>
      <p>Not affiliated with the official NYSC body.</p>
      <p><a href="#" style="color: #10B981; text-decoration: none;">Unsubscribe</a> | <a href="#" style="color: #10B981; text-decoration: none;">Privacy Policy</a></p>
    </div>
  </div>
</body>
</html>
`;

export const templates = {
  welcome: (name: string) => getEmailBase(`
    <div class="badge">Welcome onboard</div>
    <h2>Welcome to the family, ${name}! 🎉</h2>
    <p>We're thrilled to have you join 10,000+ Nigerian graduates using SmartCorper to ensure a stress-free service year.</p>
    <p>Here's how to hit the ground running:</p>
    <ul>
      <li><strong>Check your Roadmap:</strong> See exactly what stage you're in.</li>
      <li><strong>Verify Documents:</strong> Use the Vault to track mandatory uploads.</li>
      <li><strong>Ask AI:</strong> Get instant answers to your camp or PPA questions.</li>
      <li><strong>Set Alerts:</strong> Never miss a biometric clearance window.</li>
    </ul>
    <a href="https://smartcorper.app/dashboard" class="btn">Go to my dashboard</a>
    <p>If you have any questions, just reply to this email. We're here to help!</p>
  `),

  deadline: (title: string, days: number, stage: string) => getEmailBase(`
    <div class="badge" style="background: #fef2f2; color: #dc2626;">Deadline Alert</div>
    <h2>Action Required: ${title}</h2>
    <p>This is a reminder that your deadline for <strong>${title}</strong> (${stage}) is in <strong>${days} days</strong>.</p>
    <p>Missing this window could result in service delays or loss of monthly allowance. Please ensure you have all required documents ready.</p>
    <div style="background: #f9fafb; padding: 20px; border-radius: 16px; margin: 20px 0;">
      <p style="margin: 0; font-size: 14px; font-weight: 700;">What you need to do:</p>
      <p style="margin: 5px 0 0; font-size: 14px;">Log in to the dashboard to view the specific checklist for this deadline.</p>
    </div>
    <a href="https://smartcorper.app/deadlines" class="btn">View Deadlines</a>
    <a href="#" style="display: block; text-align: center; color: #4b5563; font-size: 12px; font-weight: 600; text-decoration: none; margin-top: 10px;">+ Add to Calendar</a>
  `),

  weeklySummary: (name: string, progress: number, completed: number) => getEmailBase(`
    <div class="badge">Weekly Progress Report</div>
    <h2>Great work this week, ${name}!</h2>
    <p>You're moving closer to your POP. Here's your summary for the past 7 days:</p>
    <div style="display: flex; gap: 20px; margin: 30px 0;">
      <div style="flex: 1; text-align: center; background: #f9fafb; padding: 15px; border-radius: 12px;">
        <div style="font-size: 24px; font-weight: 900; color: #10B981;">${progress}%</div>
        <div style="font-size: 10px; font-weight: 800; color: #9ca3af; text-transform: uppercase;">Total Progress</div>
      </div>
      <div style="flex: 1; text-align: center; background: #f9fafb; padding: 15px; border-radius: 12px;">
        <div style="font-size: 24px; font-weight: 900; color: #111827;">${completed}</div>
        <div style="font-size: 10px; font-weight: 800; color: #9ca3af; text-transform: uppercase;">Tasks Done</div>
      </div>
    </div>
    <h3>Coming Up Next Week:</h3>
    <ul>
      <li>Monthly CDS Group Meeting (Thursday)</li>
      <li>Biometrics Window Opens (Saturday)</li>
    </ul>
    <a href="https://smartcorper.app/dashboard" class="btn">View Full Summary</a>
  `),

  newArticle: (title: string, excerpt: string, slug: string) => getEmailBase(`
    <div class="badge" style="background: #f5f3ff; color: #7c3aed;">New Guide Published</div>
    <h2>${title}</h2>
    <p>${excerpt}</p>
    <p>Our experts have vetted this information to ensure it aligns with the latest 2024 NYSC directives.</p>
    <a href="https://smartcorper.app/knowledge/${slug}" class="btn">Read Full Guide</a>
  `),

  upgrade: () => getEmailBase(`
    <div class="badge" style="background: #fffbeb; color: #d97706;">Level Up Your Service</div>
    <h2>Unlock Premium NYSC Guidance 🚀</h2>
    <p>Are you struggling with PPA relocation or unsure about your CDS project proposal? Our Pro members get exclusive tools to navigate these hurdles effortlessly.</p>
    <p><strong>What you're missing:</strong></p>
    <ul>
      <li>Unlimited AI queries (24/7 expert support)</li>
      <li>Relocation Approval Pack (Templates & Scripts)</li>
      <li>Priority SMS Alerts for biometric windows</li>
      <li>CDS Finance & Proposal Generator</li>
    </ul>
    <div style="text-align: center; margin: 30px 0; padding: 20px; border: 2px dashed #10B981; border-radius: 20px;">
      <p style="margin: 0; color: #059669; font-weight: 800;">LIMITED TIME OFFER</p>
      <p style="margin: 5px 0 0; font-size: 20px; font-weight: 900;">20% OFF Yearly Plan</p>
    </div>
    <a href="https://smartcorper.app/pricing" class="btn">Upgrade to Pro Now</a>
  `),

  passwordReset: (link: string) => getEmailBase(`
    <div class="badge" style="background: #eff6ff; color: #2563eb;">Security</div>
    <h2>Reset Your Password</h2>
    <p>We received a request to reset the password for your SmartCorper account. Click the button below to choose a new one.</p>
    <a href="${link}" class="btn">Reset Password</a>
    <p style="font-size: 12px; color: #ef4444;">This link will expire in 1 hour for your security.</p>
    <p style="font-size: 12px;">If you didn't request this, you can safely ignore this email. Your account is still secure.</p>
  `),

  expiry: (days: number) => getEmailBase(`
    <div class="badge" style="background: #fff7ed; color: #ea580c;">Subscription Notice</div>
    <h2>Your Pro Access Expires in ${days} Days</h2>
    <p>Your subscription to SmartCorper Pro is set to expire on <strong>July 15, 2024</strong>.</p>
    <p>Don't lose access to your priority alerts, AI support, and premium guide templates during this critical stage of your service year.</p>
    <a href="https://smartcorper.app/settings" class="btn">Renew Subscription</a>
    <p style="font-size: 13px;">If you've already renewed, please ignore this message.</p>
  `)
};
