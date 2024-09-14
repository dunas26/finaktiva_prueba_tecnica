import { Hono } from "hono";

export interface SingleRoute {
	router: Hono;
	prefix?: string;
}
