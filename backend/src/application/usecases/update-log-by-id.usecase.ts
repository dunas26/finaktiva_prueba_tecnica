import { inject, injectable } from "inversify";
import { LogDefinition } from "../../domain/models/log";
import { LogRepository, LogRepositoryToken } from "../../domain/repositories/log.repository";

export const UpdateLogByIdToken = "update_log_by_id_token";
export interface UpdateLogByIdUseCase {
	execute(id: string, log: Omit<LogDefinition, "createdAt">): Promise<LogDefinition>;
}

@injectable()
export class UpdateLogById implements UpdateLogByIdUseCase {
	constructor(@inject(LogRepositoryToken) private repository: LogRepository) { }

	execute(id: string, log: Omit<LogDefinition, "createdAt">): Promise<LogDefinition> {
		return this.repository.update(id, log);
	}
}
