import type { BusinessVertical } from "../core/types";

export interface LeadFieldDefinition {
  key: string;
  label: string;
  required: boolean;
  input: "text" | "email" | "phone" | "textarea" | "select" | "checkbox";
}

export interface LeadStatusPipeline {
  vertical: BusinessVertical;
  statuses: readonly string[];
}

export interface LeadRecord {
  id: number;
  name: string;
  email: string;
  phone?: string | null;
  subject?: string | null;
  message?: string | null;
  status: string;
  createdAt: string;
}

export interface CreateLeadRequest {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message?: string;
  metadata?: Record<string, string | number | boolean | null>;
}
