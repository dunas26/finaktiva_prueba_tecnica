import { injectable } from "inversify";
import { LogRepository } from "../../domain/repositories/log.repository";
import { LogDefinition } from "../../domain/models/log";
import { ErrorResponse } from "../responses";
import { uid } from "uid";

const logs: LogDefinition[] = [];
@injectable()
export class LogPersistence implements LogRepository {
	async getAll(): Promise<LogDefinition[]> {
		return logs.filter((l) => !l.deletedAt);
	}
	async get(id: string): Promise<LogDefinition> {
		const log = logs.find((l) => l.id === id);
		if (!log) throw ErrorResponse.new().withMessage(`Log with id ${id} not found`).withStatusCode(404);
		return log;
	}
	async save(log: Omit<LogDefinition, "id" | "createdAt">): Promise<LogDefinition> {
		const savedLog = {
			...log,
			id: uid(),
			createdAt: new Date(),
		};
		logs.push(savedLog);
		return savedLog;
	}
	async delete(id: string): Promise<LogDefinition> {
		const log = logs.find((l) => l.id === id);
		if (!log) throw ErrorResponse.new().withMessage(`Log with id ${id} not found`).withStatusCode(404);
		log.deletedAt = new Date();
		logs.splice(logs.indexOf(log), 1, log);
		return log;
	}

	async update(id: string, log: Omit<LogDefinition, "createdAt">): Promise<LogDefinition> {
		const logIndex = logs.findIndex((l) => l.id === id);
		if (logIndex === -1) throw ErrorResponse.new().withMessage(`Log with id ${id} not found`).withStatusCode(404);
		logs[logIndex] = {
			...logs[logIndex],
			...log,
		};
		return logs[logIndex];
	}
}
