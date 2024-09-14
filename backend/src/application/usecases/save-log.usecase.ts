import { inject, injectable } from "inversify";
import { LogDefinition } from "../../domain/models/log";
import { LogRepository, LogRepositoryToken } from "../../domain/repositories/log.repository";

export const SaveLogToken = "save_log_token";
export interface SaveLogUseCase {
	execute(log: Omit<LogDefinition, "id" | "createdAt">): Promise<LogDefinition>;
}

@injectable()
export class SaveLog implements SaveLogUseCase {

	constructor(@inject(LogRepositoryToken) private repository: LogRepository) { }
	execute(log: Omit<LogDefinition, "id" | "createdAt">): Promise<LogDefinition> {
		return this.repository.save(log);
	}
}
