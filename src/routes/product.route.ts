import Route from "./index"
//import { productValidator } from "../middleware/validator.middleware"
import CProduct from "../controller/product.controller"

export default new class ProductRoute extends Route {
    useRoute(): void {
        this.router.get("/", CProduct.readAll)
        this.router.get("/:id", CProduct.readOne)
        this.router.post("/", CProduct.create)
        this.router.put("/:id", CProduct.update)
        this.router.delete("/:id", CProduct.delete)
    }
}