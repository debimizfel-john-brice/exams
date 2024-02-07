import express from "express";
import cors from "cors";
import routeNotFound from "./3-middleware/route_not_found";
import catchAll from "./3-middleware/catch_all";
import appConfig from "./4-utils/app_config";
import scheduleRoutes from "./6-routes/schedule_route";
const server = express();

server.use(cors());
server.use(express.json());

server.use("/api", scheduleRoutes);

server.use("*", routeNotFound);
server.use(catchAll);

server.listen(appConfig.port, () => console.log(`Listening on http://localhost:${appConfig.port} of Database: ${appConfig.mysql_database}`));