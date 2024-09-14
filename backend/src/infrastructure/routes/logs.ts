import { getDependency } from "../config/dependencies";
import { GetAllLogsToken, GetAllLogsUseCase, GetLogByIdToken, GetLogByIdUseCase } from "../../application/usecases";
import { Context, Hono } from "hono";
import { SuccessResponse } from "../responses";
import { SaveLogToken, SaveLogUseCase } from "../../application/usecases/save-log.usecase";
import { LogDefinition } from "../../domain/models/log";
import { DeleteLogByIdToken, DeleteLogByIdUseCase } from "../../application/usecases/delete-log-by-id.usecase";
import { UpdateLogByIdToken, UpdateLogByIdUseCase } from "../../application/usecases/update-log-by-id.usecase";

export const logs = new Hono();

logs.get("/", async (c: Context) => {
	const getAllLogs = getDependency<GetAllLogsUseCase>(GetAllLogsToken);
	const logs = await getAllLogs.execute();
	return SuccessResponse.new().withData(logs).build();
});

logs.get("/:id", async (c: Context) => {
	const id = c.req.param("id");
	const getLogById = getDependency<GetLogByIdUseCase>(GetLogByIdToken);
	const log = await getLogById.execute(id);
	return SuccessResponse.new().withData(log).build();
});

logs.post("/", async (c: Context) => {
	const saveLog = getDependency<SaveLogUseCase>(SaveLogToken);
	const log = await c.req.json() as LogDefinition;
	const savedLog = await saveLog.execute(log);
	return SuccessResponse.new().withData(savedLog).build();
});

logs.put("/:id", async (c: Context) => {
	const id = c.req.param("id");
	const updateLogById = getDependency<UpdateLogByIdUseCase>(UpdateLogByIdToken);
	const log = await c.req.json() as Omit<LogDefinition, "createdAt">;
	const updatedLog = await updateLogById.execute(id, log);
	return SuccessResponse.new().withData(updatedLog).build();
});

logs.delete("/:id", async (c: Context) => {
	const id = c.req.param("id");
	const deleteLogById = getDependency<DeleteLogByIdUseCase>(DeleteLogByIdToken);
	const deletedLog = await deleteLogById.execute(id);
	return SuccessResponse.new().withData(deletedLog).build();
});

