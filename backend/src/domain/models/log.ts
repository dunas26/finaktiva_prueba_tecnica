export type LogType = "api" | "manual_event_form";
export type LogSeverity = "info" | "warn" | "error";
export interface LogDefinition {
	id: string;
	type?: LogType;
	description: string;
	severity: LogSeverity;
	createdAt: Date;
	deletedAt?: Date;
}

export class Log implements LogDefinition {

	public id: string = "";
	public type?: LogType;
	public description: string = "";
	public severity: LogSeverity = "info";
	public createdAt: Date = new Date();
	public deletedAt?: Date;

	static new(): Log {
		return new Log();
	}

	withId(id: string): Log {
		this.id = id;
		return this;
	}

	withType(type: LogType): Log {
		this.type = type;
		return this;
	}

	withDescription(description: string): Log {
		this.description = description;
		return this;
	}

	withSeverity(severity: LogSeverity): Log {
		this.severity = severity;
		return this;
	}

	withCreation(createdAt: Date): Log {
		this.createdAt = createdAt;
		return this;
	}

	withDeletion(deletedAt: Date): Log {
		this.deletedAt = deletedAt;
		return this;
	}
}
