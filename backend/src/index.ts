import "reflect-metadata";
import "dotenv/config";
import { errorHandler } from "./infrastructure/middlewares";
import { AppServer } from "./infrastructure/app";
import { appRoutes } from "./infrastructure/routes";
import { configureDependencies } from "./infrastructure/config/dependencies";
import { setupMysql } from "./infrastructure/config/mysql.db";

const PORT = parseInt(process.env.APP_PORT!) || 3000;
const PREFIX = process.env.API_PREFIX || "/api/v1";

const main = async () => {
	await Promise.resolve(() => setupMysql()).then(
		() =>
			new AppServer({
				prefix: PREFIX,
				port: PORT,
				routes: appRoutes,
			}).do(() => {
				configureDependencies();
			}).onError(errorHandler).prepare()
	)
}

main();
