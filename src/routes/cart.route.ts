import Route from "./index"
//import { orderLineValidator } from "../middleware/validator.middleware"
import COrderLine from "../controller/cart.controller"

export default new class OrderLineRoute extends Route {
    useRoute(): void {
        this.router.get("/", COrderLine.readAll)
        this.router.get("/:cartid", COrderLine.readBy)
        this.router.post("/", COrderLine.create)
        this.router.delete("/:id", COrderLine.remove)
    }
}