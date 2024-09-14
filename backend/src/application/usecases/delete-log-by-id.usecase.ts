import { inject, injectable } from "inversify";
import { LogDefinition } from "../../domain/models/log";
import { LogRepository, LogRepositoryToken } from "../../domain/repositories/log.repository";

export const DeleteLogByIdToken = "delete_log_by_id_token";
export interface DeleteLogByIdUseCase {
	execute(id: string): Promise<LogDefinition>;
}
@injectable()
export class DeleteLogById implements DeleteLogByIdUseCase {
	constructor(@inject(LogRepositoryToken) private repository: LogRepository) { }
	execute(id: string): Promise<LogDefinition> {
		return this.repository.delete(id);
	}

}
