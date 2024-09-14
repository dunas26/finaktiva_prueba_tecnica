import { inject, injectable } from "inversify";
import { LogDefinition } from "../../domain/models/log";
import { LogRepository, LogRepositoryToken } from "../../domain/repositories/log.repository";

export const GetLogByIdToken = "get_log_by_id_token";
export interface GetLogByIdUseCase {
	execute(id: string): Promise<LogDefinition>;
}

@injectable()
export class GetLogById implements GetLogByIdUseCase {

	constructor(@inject(LogRepositoryToken) private repository: LogRepository) { }

	async execute(id: string): Promise<LogDefinition> {
		return this.repository.get(id);
	}

}
