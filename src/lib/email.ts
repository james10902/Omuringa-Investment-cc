import nodemailer from "nodemailer";
import { COMPANY } from "@/lib/utils";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST || "smtp.gmail.com",
  port: Number(process.env.EMAIL_SERVER_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
});

const FROM = `"${COMPANY.name}" <${process.env.EMAIL_FROM || COMPANY.email}>`;

export async function sendWelcomeEmail(to: string, name: string) {
  await transporter.sendMail({
    from: FROM,
    to,
    subject: `Welcome to ${COMPANY.name}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
        <div style="background:#166534;padding:24px;text-align:center;">
          <h1 style="color:white;margin:0;font-size:24px;">${COMPANY.name}</h1>
          <p style="color:#bbf7d0;margin:4px 0 0;">${COMPANY.academy}</p>
        </div>
        <div style="padding:32px;background:#fff;">
          <h2 style="color:#166534;">Welcome, ${name}!</h2>
          <p>Your account has been successfully created on the ${COMPANY.name} portal.</p>
          <p>You can now:</p>
          <ul>
            <li>Complete your trainee application</li>
            <li>Upload required documents</li>
            <li>Track your application status</li>
          </ul>
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" 
             style="display:inline-block;background:#166534;color:white;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:bold;margin-top:16px;">
            Go to Dashboard
          </a>
        </div>
        <div style="background:#f9fafb;padding:16px;text-align:center;font-size:12px;color:#6b7280;">
          <p>${COMPANY.location} | ${COMPANY.phone} | ${COMPANY.email}</p>
        </div>
      </div>
    `,
  });
}

export async function sendApplicationConfirmation(to: string, name: string) {
  await transporter.sendMail({
    from: FROM,
    to,
    subject: "Application Received – Omuringa Security Training Academy",
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
        <div style="background:#166534;padding:24px;text-align:center;">
          <h1 style="color:white;margin:0;font-size:24px;">${COMPANY.academy}</h1>
        </div>
        <div style="padding:32px;background:#fff;">
          <h2 style="color:#166534;">Application Received, ${name}!</h2>
          <p>Thank you for submitting your training application. We have received it and it is now under review.</p>
          <p>Our team will review your application and documents. You will be notified of any updates via email.</p>
          <p><strong>What happens next:</strong></p>
          <ol>
            <li>Application review (2–5 business days)</li>
            <li>Document verification</li>
            <li>Approval notification</li>
            <li>Training commencement</li>
          </ol>
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" 
             style="display:inline-block;background:#166534;color:white;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:bold;margin-top:16px;">
            Track Application
          </a>
        </div>
        <div style="background:#f9fafb;padding:16px;text-align:center;font-size:12px;color:#6b7280;">
          <p>${COMPANY.trainingLocation} | ${COMPANY.phone} | ${COMPANY.email}</p>
        </div>
      </div>
    `,
  });
}

export async function sendStatusUpdateEmail(to: string, name: string, status: string, notes?: string) {
  const statusMessages: Record<string, { subject: string; body: string; color: string }> = {
    APPROVED: {
      subject: "Congratulations! Your Application Has Been Approved",
      body: "We are pleased to inform you that your training application has been <strong>approved</strong>. Our team will contact you with further details about your training commencement.",
      color: "#166534",
    },
    REJECTED: {
      subject: "Application Status Update",
      body: "After careful review, we regret to inform you that your application was not successful at this time. You are welcome to reapply in the future.",
      color: "#dc2626",
    },
    MORE_INFO_REQUIRED: {
      subject: "Additional Information Required",
      body: "We require additional information or documents to process your application. Please log in to your dashboard and review the notes.",
      color: "#d97706",
    },
    UNDER_REVIEW: {
      subject: "Application Under Review",
      body: "Your application is currently being reviewed by our team. We will notify you once a decision has been made.",
      color: "#2563eb",
    },
  };

  const info = statusMessages[status] || {
    subject: "Application Status Update",
    body: "Your application status has been updated. Please log in to view the details.",
    color: "#166534",
  };

  await transporter.sendMail({
    from: FROM,
    to,
    subject: info.subject,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
        <div style="background:${info.color};padding:24px;text-align:center;">
          <h1 style="color:white;margin:0;font-size:24px;">${COMPANY.academy}</h1>
        </div>
        <div style="padding:32px;background:#fff;">
          <h2 style="color:${info.color};">Dear ${name},</h2>
          <p>${info.body}</p>
          ${notes ? `<div style="background:#f9fafb;padding:16px;border-radius:8px;margin-top:16px;"><strong>Notes from our team:</strong><p>${notes}</p></div>` : ""}
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" 
             style="display:inline-block;background:${info.color};color:white;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:bold;margin-top:16px;">
            View Dashboard
          </a>
        </div>
        <div style="background:#f9fafb;padding:16px;text-align:center;font-size:12px;color:#6b7280;">
          <p>${COMPANY.location} | ${COMPANY.phone} | ${COMPANY.email}</p>
        </div>
      </div>
    `,
  });
}

export async function sendFormNotification(type: string, data: Record<string, string>) {
  const adminEmail = process.env.EMAIL_SERVER_USER || COMPANY.email;
  const rows = Object.entries(data)
    .map(([k, v]) => `<tr><td style="padding:8px;font-weight:bold;color:#374151;">${k}</td><td style="padding:8px;color:#6b7280;">${v}</td></tr>`)
    .join("");

  await transporter.sendMail({
    from: FROM,
    to: adminEmail,
    subject: `New ${type} Submission – ${COMPANY.name}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
        <div style="background:#166534;padding:24px;">
          <h1 style="color:white;margin:0;font-size:20px;">New ${type} Submission</h1>
        </div>
        <div style="padding:24px;background:#fff;">
          <table style="width:100%;border-collapse:collapse;">${rows}</table>
        </div>
      </div>
    `,
  });
}
