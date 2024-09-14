import { HTTPException } from "hono/http-exception";
import { StatusCode } from "hono/utils/http-status";

export interface ResponseDefinition<T = any> {
	data: T;
	statusCode: number;
	message: string;
	timestamp: string;
	success: boolean;
}

export class ResponseBuilder<T = any> implements ResponseDefinition<T> {
	public data: T = null as any;
	public statusCode: StatusCode = 200;
	public message: string = "";
	public timestamp: string = new Date().toISOString();
	public success: boolean = true;

	static new(): ResponseBuilder {
		return new ResponseBuilder();
	}

	withData(data: T): ResponseBuilder<T> {
		this.data = data;
		return this;
	}

	withMessage(message: string): ResponseBuilder<T> {
		this.message = message;
		return this;
	}

	withStatusCode(statusCode: StatusCode): ResponseBuilder<T> {
		this.statusCode = statusCode;
		return this;
	}

	withSuccess(success: boolean): ResponseBuilder<T> {
		this.success = success;
		return this;
	}

	peek(): ResponseDefinition {
		return {
			data: this.data,
			message: this.message,
			timestamp: this.timestamp,
			statusCode: this.statusCode,
			success: this.success,
		};
	}

	toException(): HTTPException {
		return new HTTPException(this.statusCode, {
			message: this.message,
			cause: this.peek(),
			res: this.build(),
		});
	}

	build(): Response {
		const headers = new Headers();
		headers.append("Content-Type", "application/json");
		return new Response(JSON.stringify(this.peek()), {
			status: this.statusCode,
			headers: headers,
		});
	}
}

export class SuccessResponse extends ResponseBuilder {
	static new() {
		return new ResponseBuilder().withMessage("Success").withStatusCode(200).withSuccess(true);
	}
}

export class ErrorResponse extends ResponseBuilder {
	static new() {
		return new ResponseBuilder().withMessage("Failure").withStatusCode(500).withSuccess(false);
	}
}
