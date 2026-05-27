import type { CreateLeadInput, LeadRecord } from "../schema";

export interface LeadsRepository {
  createLead(input: CreateLeadInput): Promise<LeadRecord>;
  getLeads(): Promise<LeadRecord[]>;
  getLead(id: number): Promise<LeadRecord | undefined>;
  updateLead(id: number, updates: Partial<LeadRecord>): Promise<LeadRecord | undefined>;
}
