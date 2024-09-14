import { LogDefinition } from "../../domain/models/log";
import { LogRepository, LogRepositoryToken } from "../../domain/repositories/log.repository";
import { inject, injectable } from "inversify";

export const GetAllLogsToken = "get_all_logs_token";
export interface GetAllLogsUseCase {
	execute(): Promise<LogDefinition[]>;
}

@injectable()
export class GetAllLogs implements GetAllLogsUseCase {
	constructor(@inject(LogRepositoryToken) private repository: LogRepository) { }
	async execute(): Promise<LogDefinition[]> {
		return this.repository.getAll();
	}
}
