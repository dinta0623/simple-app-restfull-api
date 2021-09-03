/**
 * @import module
 */
import express from 'express'

import cors from 'cors'
/**
 * @import stuff
 */
import config from "./config/index"
import Logger from "./config/logger"
import mongodb from "./config/db"
import ProductsRoute from "./routes/product.route"
import ErrorHandle from "./middleware/error.middleware"
import orderRoute from './routes/order.route'
import cartsRoute from './routes/cart.route'

class App {
    public app: express.Application
    protected PORT: string | number
    constructor() {
        this.app = express()
        this.PORT = config.server.port
        this.init()
        this.start()
    }
    init() {
        mongodb.connect()
        if (config.server.mode == "development") {
            const morgan = require("morgan")
            this.app.use(() => morgan('dev'))
        }
        this.app.use(cors({
            origin: config.server.proxy,
            methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']
        }))
        this.app.use(express.json())
    }
    start() {
        this.app.get("/", (req: express.Request, res: express.Response) => {
            res.send("Well Done......")
        })
        this.app.use("/api/products", ProductsRoute.router)
        this.app.use("/api/order", orderRoute.router)
        this.app.use("/api/carts", cartsRoute.router)
        this.app.use(ErrorHandle)
    }
    listen() {
        this.app.listen(this.PORT, () => {
            Logger.info("server", `Connected to port ${this.PORT}`)
        })
    }
}
new App().listen()