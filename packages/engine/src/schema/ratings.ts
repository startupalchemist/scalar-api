import type { EntityTimestamps, IdentifiedRecord } from "./core";

export interface RatingRecord extends IdentifiedRecord, EntityTimestamps {
  leadId?: number | null;
  score: number;
  channel: string;
  token: string;
}

export interface WebhookRecord extends IdentifiedRecord, EntityTimestamps {
  name: string;
  url: string;
  events: string[];
  secret: string;
  active: boolean;
}

export interface WebhookLogRecord extends IdentifiedRecord, EntityTimestamps {
  webhookId: number;
  event: string;
  payload: string;
  statusCode?: number | null;
  response?: string | null;
  success: boolean;
  duration?: number | null;
}
