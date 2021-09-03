import Route from "./index"
//import { orderValidator } from "../middleware/validator.middleware"
import COrder from "../controller/order.controller"

export default new class OrderRoute extends Route {
    useRoute(): void {
        this.router.get("/", COrder.readAll)
        this.router.get("/:id", COrder.readOne)
        this.router.post("/", COrder.create)
        this.router.delete("/:id", COrder.remove)
    }
}