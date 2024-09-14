import { LogDefinition } from "../models/log";

export const LogRepositoryToken = "log_repository_token";
export interface LogRepository {
	getAll(): Promise<LogDefinition[]>;
	get(id: string): Promise<LogDefinition>;
	save(log: Omit<LogDefinition, "id" | "createdAt">): Promise<LogDefinition>;
	delete(id: string): Promise<LogDefinition>;
	update(id: string, log: Omit<LogDefinition, "id" | "createdAt">): Promise<LogDefinition>;
}
