import type { EntityTimestamps, IdentifiedRecord } from "./core";

export interface LeadRecord extends IdentifiedRecord, EntityTimestamps {
  name: string;
  phone: string;
  email: string;
  subject?: string | null;
  vehicle?: string | null;
  insurance?: string | null;
  message?: string | null;
  status: string;
  loanerRequested?: boolean | null;
  pickupRequested?: boolean | null;
  insuranceApproved?: boolean | null;
  insuranceApprovalTimestamp?: Date | null;
  utmSource?: string | null;
  utmMedium?: string | null;
  utmCampaign?: string | null;
  artworkId?: number | null;
}

export interface CreateLeadInput {
  name: string;
  phone: string;
  email: string;
  subject?: string;
  vehicle?: string;
  insurance?: string;
  message?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
}
