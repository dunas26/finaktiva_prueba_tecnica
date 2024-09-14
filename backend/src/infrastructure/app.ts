import { Context, Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { SingleRoute } from "./routes";
import { serve } from "@hono/node-server"
import { errorBootstrap } from "./middlewares";
import { cors } from "hono/cors";

export interface AppServerConfig {
	routes?: SingleRoute[];
	port?: number;
	prefix?: string;
}

export type ErrorHandler = (e: Error | HTTPException, c: Context) => Response;
export class AppServer {
	private hono = new Hono();
	public port = 3000;
	public routes: SingleRoute[] = [];
	public prefix = "";

	public errorHandler?: ErrorHandler = undefined;

	constructor({ routes, port, prefix }: AppServerConfig) {
		if (port) this.port = port;
		if (routes) this.routes = routes;
		if (prefix) this.prefix = prefix;
	}

	onError(errorHandler: ErrorHandler): this {
		this.errorHandler = errorHandler;
		return this;
	}

	do(fn: () => void): this {
		fn();
		return this;
	}

	private prepareErrorHandler() {
		if (!this.errorHandler) return;
		this.hono.use("*", errorBootstrap);
		this.hono.onError(this.errorHandler);
	}

	private prepareRoutes() {
		this.routes.map((r) => {
			const route = `${this.prefix}${r.prefix ?? ''}`;
			this.hono.route(route, r.router);
		});
	}

	private prepareCors() {
		const corsConfig = { origin: process.env.CORS_ORIGIN ?? "*", allowMethods: process.env.CORS_ALLOWED_METHODS ? process.env.CORS_ALLOWED_METHODS.split(",") : ["GET", "POST", "PUT", "DELETE", "OPTIONS"] };
		console.log(corsConfig);
		this.hono.use("*", cors(corsConfig));
	}

	prepare() {
		this.prepareCors();
		this.prepareErrorHandler();
		this.prepareRoutes();
		serve({
			fetch: this.hono.fetch,
			port: this.port,
		});
	}
}
