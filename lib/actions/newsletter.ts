// app/actions/newsletter.ts
"use server";

import { db } from "@/db";
import { newsletterSubscribers } from "@/db/schema";
import { rateLimit } from "../rate-limit";
import { headers } from "next/headers";
import crypto from "crypto";
import { Resend } from "resend";
import { eq } from "drizzle-orm";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function subscribeNewsletter(formData: FormData) {
  try {
    // 1️⃣ Honeypot check
    if (formData.get("company")) {
      return { success: true };
    }

    const email = (formData.get("email") as string)?.trim();

    if (!email) {
      return { success: false, message: "Email required" };
    }

    // 2️⃣ Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { success: false, message: "Invalid email" };
    }

    // 3️⃣ Rate limit
    const ip =
      (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() ??
      "unknown";
    const allowed = await rateLimit(`newsletter:${ip}`);
    if (!allowed) {
      return {
        success: false,
        message: "Too many attempts. Try again shortly.",
      };
    }

    // 4️⃣ Check if already subscribed
    const existing = await db
      .select()
      .from(newsletterSubscribers)
      .where(eq(newsletterSubscribers.email, email))
      .limit(1);

    if (existing.length > 0) {
      return {
        success: false,
        message: "This email is already on the waitlist 👀",
      };
    }

    // 5️⃣ Insert into DB
    await db.insert(newsletterSubscribers).values({
      id: crypto.randomUUID(),
      email,
    });

    // 6️⃣ Send confirmation email via Resend
    try {
      const result = await resend.emails.send({
        from: `IMFC <${process.env.EMAIL_SENDER_ADDRESS}>`,
        to: email,
        subject: "You're on the list!",
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #231F20;">
            <h2>You're on the list 🎉</h2>
            <p>Hi,</p>
            <p>Thanks for joining the waitlist! You'll be among the first to know when we launch.</p>
            <p>We’ll send you an email as soon as we are live.<br />No spam — just the good stuff.</p>
            <p>Talk soon,<br /><strong>IMFC team</strong></p>
          </div>
        `,
      });
    } catch {
      return { success: false, message: "Failed to send confirmation email" };
    }

    return { success: true };
  } catch {
    return { success: false, message: "Something went wrong" };
  }
}