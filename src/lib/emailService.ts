import nodemailer from "nodemailer";
import { config } from "dotenv";

config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: parseInt(process.env.EMAIL_SERVER_PORT || "587"),
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
});

export async function sendMagicLinkEmail(userEmail: string, magicLink: string) {
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: userEmail,
    subject: "Your Magic Link",
    html: `<p>Click the link to login: <a href="${magicLink}">Login</a></p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Magic Link sent successfully!");
  } catch (error) {
    console.error("Error sending Magic Link email:", error);
  }
}
