import mongoose from "mongoose";
import appConfig from "../app-config";

async function connect(): Promise<void> {
    try {
        const db = await mongoose.connect(appConfig.mongoDBConnectionString);
        console.log(`We're connected to ${db.connections[0].name} on MongoDB`)
    } catch (error) {
        console.log(error);
    }
}

export default {
    connect
}