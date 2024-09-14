import { logs } from "./logs";
import { SingleRoute } from "./types";
export * from "./types";

export const appRoutes: SingleRoute[] = [
	{ prefix: "/logs", router: logs },
];
