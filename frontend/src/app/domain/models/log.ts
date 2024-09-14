export type LogType = "api" | "manual_event_form";
export type LogSeverity = "info" | "warn" | "error";
export interface Log {
	id: string;
	type?: LogType;
	description: string;
	severity: LogSeverity;
	createdAt: Date;
	deletedAt?: Date;
}
