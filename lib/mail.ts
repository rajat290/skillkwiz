import nodemailer from "nodemailer";

const smtpHost = process.env.SMTP_HOST || process.env.EMAIL_HOST;
const smtpPort = Number(process.env.SMTP_PORT || process.env.EMAIL_PORT || 587);
const smtpUser = process.env.SMTP_USER || process.env.EMAIL_USER;
const smtpPass = process.env.SMTP_PASS || process.env.EMAIL_PASS;
const smtpFrom =
  process.env.SMTP_FROM ||
  process.env.EMAIL_FROM ||
  `"SkillKwiz" <${smtpUser}>`;

function getTransporter() {
  if (!smtpHost || !smtpUser || !smtpPass) {
    throw new Error(
      "Missing SMTP configuration. Provide SMTP_HOST/SMTP_USER/SMTP_PASS or EMAIL_HOST/EMAIL_USER/EMAIL_PASS."
    );
  }

  return nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });
}

export async function sendVerificationEmail({
  email,
  name,
  verificationUrl,
}: {
  email: string;
  name: string;
  verificationUrl: string;
}) {
  const transporter = getTransporter();

  await transporter.sendMail({
    from: smtpFrom,
    to: email,
    subject: "Confirm your SkillKwiz email",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 620px; margin: auto; padding: 24px; border: 1px solid #e5e7eb; border-radius: 12px;">
        <h2 style="color: #00418d; margin: 0 0 12px;">Congratulations, ${name}!</h2>
        <p style="color: #333; line-height: 1.6;">
          Thank you for registering with SkillKwiz. We are excited to have you on board.
        </p>
        <p style="color: #333; line-height: 1.6;">
          Please confirm your email address to activate your account and start using SkillKwiz services.
        </p>
        <a href="${verificationUrl}" style="display: inline-block; margin: 20px 0; padding: 12px 20px; background: #f73e5d; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 700;">
          Verify Email
        </a>
        <p style="color: #555; line-height: 1.6;">If the button does not work, copy and paste this link into your browser:</p>
        <p style="word-break: break-all; color: #00418d;">${verificationUrl}</p>
        <p style="margin-top: 24px; font-size: 12px; color: #777;">This verification link expires in 24 hours.</p>
      </div>
    `,
  });
}

export async function sendAdminNotification(userEmail: string, userName: string) {
  if (!process.env.ADMIN_EMAIL) return;

  const transporter = getTransporter();

  await transporter.sendMail({
    from: smtpFrom,
    to: process.env.ADMIN_EMAIL,
    subject: "New SkillKwiz Registration",
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h3 style="color: #f73e5d;">New User Registered</h3>
        <p><strong>Name:</strong> ${userName}</p>
        <p><strong>Email:</strong> ${userEmail}</p>
        <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
      </div>
    `,
  });
}
