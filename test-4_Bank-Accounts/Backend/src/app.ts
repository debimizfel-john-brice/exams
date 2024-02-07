import express from "express"
import appConfig from "./app-config";
import dal from "./5-services/dal";
import routeNotFound from "./3-middleware/route-not-found";
import catchAll from "./3-middleware/catch-all";
import accountRoutes from "./6-routes/account_routes";
import cors from "cors";

const server = express();

server.use(cors())
server.use(express.json());

server.use("/api/accounts", accountRoutes);
server.use(routeNotFound);
server.use(catchAll);

server.listen(appConfig.port, async () => {
    await dal.connect();
    console.log("Listening on http://localhost:" + appConfig.port)
});