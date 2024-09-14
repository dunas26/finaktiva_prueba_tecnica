import { Container } from "inversify";
import { GetAllLogs, GetAllLogsToken, GetLogById, GetLogByIdToken } from "../../application/usecases";
import { LogPersistence } from "../persistence/log.persistence";
import { LogRepositoryToken } from "../../domain/repositories/log.repository";
import { SaveLog, SaveLogToken } from "../../application/usecases/save-log.usecase";
import { DeleteLogById, DeleteLogByIdToken } from "../../application/usecases/delete-log-by-id.usecase";
import { UpdateLogById, UpdateLogByIdToken } from "../../application/usecases/update-log-by-id.usecase";

const container = new Container();
export const configureDependencies = () => {
	// Use Cases
	container.bind(GetAllLogsToken).to(GetAllLogs);
	container.bind(SaveLogToken).to(SaveLog);
	container.bind(GetLogByIdToken).to(GetLogById);
	container.bind(DeleteLogByIdToken).to(DeleteLogById);
	container.bind(UpdateLogByIdToken).to(UpdateLogById);

	// Repositories
	container.bind(LogRepositoryToken).to(LogPersistence);
};

export const getDependency = <T>(id: string) => {
	return container.get<T>(id);
}
