// lib/rate-limit.ts
"use server";

import { db } from "@/db";
import { rateLimits } from "@/db/schema";
import { eq } from "drizzle-orm";

const WINDOW_MS = 60_000; // 1 minute
const MAX_REQUESTS = 5;  // 5 submissions per minute

export async function rateLimit(key: string) {
  const now = new Date();

  const existing = await db
    .select()
    .from(rateLimits)
    .where(eq(rateLimits.key, key))
    .limit(1);

  if (!existing.length) {
    await db.insert(rateLimits).values({
      key,
      count: "1",
      expiresAt: new Date(Date.now() + WINDOW_MS),
    });
    return true;
  }

  const record = existing[0];

  if (record.expiresAt < now) {
    await db
      .update(rateLimits)
      .set({
        count: "1",
        expiresAt: new Date(Date.now() + WINDOW_MS),
      })
      .where(eq(rateLimits.key, key));
    return true;
  }

  if (Number(record.count) >= MAX_REQUESTS) {
    return false;
  }

  await db
    .update(rateLimits)
    .set({
      count: String(Number(record.count) + 1),
    })
    .where(eq(rateLimits.key, key));

  return true;
}
