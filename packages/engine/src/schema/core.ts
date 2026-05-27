export interface EntityTimestamps {
  createdAt: Date;
  updatedAt?: Date | null;
}

export interface IdentifiedRecord {
  id: number;
}

export interface SettingRecord extends IdentifiedRecord {
  key: string;
  value: string;
  updatedAt: Date;
}
