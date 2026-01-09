
import { templates } from './emailTemplates';

type EmailType = keyof typeof templates;

export const sendEmail = (type: EmailType, to: string, params: any) => {
  // In a real app, this would call an API like SendGrid, Mailgun, or AWS SES
  let html = '';
  
  switch(type) {
    case 'welcome': html = templates.welcome(params.name); break;
    case 'deadline': html = templates.deadline(params.title, params.days, params.stage); break;
    case 'weeklySummary': html = templates.weeklySummary(params.name, params.progress, params.completed); break;
    case 'newArticle': html = templates.newArticle(params.title, params.excerpt, params.slug); break;
    case 'upgrade': html = templates.upgrade(); break;
    case 'passwordReset': html = templates.passwordReset(params.link); break;
    case 'expiry': html = templates.expiry(params.days); break;
  }

  console.group(`📧 MOCK EMAIL SENT [${type.toUpperCase()}]`);
  console.log(`To: ${to}`);
  console.log(`Subject: ${type.charAt(0).toUpperCase() + type.slice(1).replace(/([A-Z])/g, ' $1')}`);
  console.log(`HTML Body (Preview):`);
  // For developer convenience, we can open this in a new window if in dev mode
  // const win = window.open("", "_blank");
  // if (win) win.document.write(html);
  console.log(html);
  console.groupEnd();

  return Promise.resolve({ success: true, message: 'Email sent successfully (Simulated)' });
};
