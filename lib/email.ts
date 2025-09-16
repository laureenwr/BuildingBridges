import nodemailer from 'nodemailer';

type EmailConfig = {
  from: string;
};

function getBaseUrl(): string {
  const siteUrl = process.env.SITE_URL;
  if (siteUrl) return siteUrl.replace(/\/$/, '');
  const vercelUrl = process.env.VERCEL_URL;
  if (vercelUrl) return `https://${vercelUrl}`;
  const port = process.env.PORT || '3000';
  return `http://localhost:${port}`;
}

export function buildAbsoluteUrl(relativePath: string): string {
  const base = getBaseUrl();
  return `${base}${relativePath.startsWith('/') ? '' : '/'}${relativePath}`;
}

async function sendWithResend(to: string, subject: string, html: string, config: EmailConfig) {
  const { Resend } = await import('resend');
  const apiKey = process.env.RESEND_API_KEY as string;
  const resend = new Resend(apiKey);
  await resend.emails.send({ from: config.from, to, subject, html });
}

async function sendWithSmtp(to: string, subject: string, html: string, config: EmailConfig) {
  const host = process.env.SMTP_HOST as string;
  const port = parseInt(process.env.SMTP_PORT || '587', 10);
  const user = process.env.SMTP_USER as string;
  const pass = process.env.SMTP_PASS as string;

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  await transporter.sendMail({ from: config.from, to, subject, html });
}

export async function sendPasswordResetEmail(to: string, resetUrl: string) {
  const from = process.env.EMAIL_FROM || 'no-reply@localhost';
  const html = `
    <p>We received a request to reset your password.</p>
    <p><a href="${resetUrl}">Click here to reset your password</a></p>
    <p>This link will expire in 1 hour. If you did not request this, you can ignore this email.</p>
  `;
  const subject = 'Reset your password';

  const hasResend = !!process.env.RESEND_API_KEY;
  const hasSmtp = !!process.env.SMTP_HOST && !!process.env.SMTP_USER && !!process.env.SMTP_PASS;

  if (!hasResend && !hasSmtp) {
    return false;
  }

  const config: EmailConfig = { from };

  if (hasResend) {
    await sendWithResend(to, subject, html, config);
    return true;
  }

  await sendWithSmtp(to, subject, html, config);
  return true;
}


