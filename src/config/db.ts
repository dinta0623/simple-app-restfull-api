import mongoose from "mongoose"
import Logger from "./logger"
import config from "./index"

export default new class Mongo {
    uri: string = config.mongo.uri
    async connect() {
        mongoose.connect(this.uri, {
            dbName: config.mongo.dbname
        }).then(() => {
            Logger.info("mongodb", "Connnected to mongodb")
        }).catch((err) => {
            Logger.error("mongodb", err)
        })
    }
}