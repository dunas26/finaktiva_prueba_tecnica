import { ErrorResponse } from "../responses";
import { HTTPException } from "hono/http-exception";
import { Context } from "hono";

export const errorHandler = (e: Error | HTTPException, c: Context) => {
	console.trace();
	console.error(e);
	if (e instanceof HTTPException) {
		return (e as HTTPException).getResponse();
	}
	return ErrorResponse.new().withMessage(e.message).withStatusCode(500).build();
}
