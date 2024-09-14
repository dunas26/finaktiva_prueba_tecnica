import { Context, Next } from "hono";
import { ErrorResponse, ResponseBuilder } from "../responses";

export const errorBootstrap = async (c: Context, n: Next) => {
	try {
		await n();
	} catch (e) {
		if (e instanceof ResponseBuilder) {
			throw e.toException();
		}
		throw ErrorResponse.new().withMessage("An unexpected error has occurred.").withStatusCode(500).toException();
	}
}
