import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, serial, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  email: text("email").notNull(),
  vehicle: text("vehicle").notNull(),
  insurance: text("insurance"),
  message: text("message"),
  status: text("status").notNull().default("New Lead"),
  loanerRequested: boolean("loaner_requested").default(false),
  pickupRequested: boolean("pickup_requested").default(false),
  insuranceApproved: boolean("insurance_approved").default(false),
  insuranceApprovalTimestamp: timestamp("insurance_approval_timestamp"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertLeadSchema = createInsertSchema(leads).omit({
  id: true,
  createdAt: true,
  status: true,
  loanerRequested: true,
  pickupRequested: true,
  insuranceApproved: true,
  insuranceApprovalTimestamp: true,
});

export type InsertLead = z.infer<typeof insertLeadSchema>;
export type Lead = typeof leads.$inferSelect;

export const leadStatuses = [
  "New Lead",
  "Sale Closed",
  "Claim Initiated",
  "RA Signed",
  "Loaner Assigned",
  "Vehicle In Shop",
  "Scoped",
  "Estimate Sent",
  "First Look",
  "Supplement Submitted",
  "Awaiting Approval",
  "Approved",
  "R&I",
  "PDR",
  "QC 1",
  "Reinstall",
  "QC 2",
  "Detail",
  "Ready for Delivery",
  "Delivered",
  "Closed",
] as const;
