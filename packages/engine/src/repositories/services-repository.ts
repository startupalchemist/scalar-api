import type { CreateServiceInput, ServiceRecord } from "../schema";

export interface ServicesRepository {
  getServices(): Promise<ServiceRecord[]>;
  getServiceById(id: number): Promise<ServiceRecord | undefined>;
  createService(input: CreateServiceInput): Promise<ServiceRecord>;
  updateService(id: number, updates: Partial<ServiceRecord>): Promise<ServiceRecord | undefined>;
  deleteService(id: number): Promise<void>;
}
