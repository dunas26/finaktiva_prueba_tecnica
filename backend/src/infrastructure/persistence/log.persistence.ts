import { injectable } from "inversify";
import { LogRepository } from "../../domain/repositories/log.repository";
import { LogDefinition } from "../../domain/models/log";
import { setupMysql } from "../config/mysql.db";
import { Pool } from "mysql2/promise";
import { uid } from "uid/secure";


@injectable()
export class LogPersistence implements LogRepository {
	constructor() {
		const { connection } = setupMysql();
		this.conn = connection;
	}
	private conn!: Pool;

	async getAll(): Promise<LogDefinition[]> {
		const [res] = await this.conn.query("SELECT * FROM EventLogs WHERE deletedAt is NULL");
		return res as LogDefinition[];
	}
	async get(id: string): Promise<LogDefinition> {
		const [res] = await this.conn.query("SELECT * FROM EventLogs WHERE id=?", [id]);
		const results = res as LogDefinition[];
		return results[0];
	}
	async save(log: Omit<LogDefinition, "id" | "createdAt">): Promise<LogDefinition> {
		const id = uid();
		const [res] = await this.conn.query("INSERT INTO EventLogs(id, type, description, severity, createdAt) VALUES(?,?,?,?,?)",
			[id, log.type, log.description, log.severity, new Date().toISOString().split("T")[0]]).then(() => this.conn.query("SELECT * FROM EventLogs WHERE id=?", [id]));
		const results = res as LogDefinition[];
		return results[0];
	}
	async delete(id: string): Promise<LogDefinition> {
		const [res] = await this.conn.query("UPDATE EventLogs SET deletedAt=? WHERE id=?", [new Date().toISOString().split("T")[0], id]).then(() => this.conn.query("SELECT * FROM EventLogs WHERE id=?", [id]));
		const results = res as LogDefinition[];
		return results[0];
	}
	async update(id: string, log: Omit<LogDefinition, "id" | "createdAt">): Promise<LogDefinition> {
		const [res] = await this.conn.query("UPDATE EventLogs SET type=?, description=?, severity=? WHERE id=?", [log.type, log.description, log.severity, id]).then(() => this.conn.query("SELECT * FROM EventLogs WHERE id=?", [id]));
		const results = res as LogDefinition[];
		return results[0];
	}
}
