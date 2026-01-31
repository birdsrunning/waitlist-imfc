import { pgTable, text, timestamp, index } from "drizzle-orm/pg-core";

export const newsletterSubscribers = pgTable(
  "newsletter_subscribers",
  {
    id: text("id").primaryKey(),
    email: text("email").notNull().unique(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [index("newsletter_email_idx").on(table.email)],
);

export const rateLimits = pgTable("rate_limits", {
  key: text("key").primaryKey(), // IP or IP+action
  count: text("count").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
});