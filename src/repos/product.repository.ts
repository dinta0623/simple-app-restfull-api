import Product, {IProduct} from "../models/product.model"

export default new class UserRepo {
    async findProduct(){
        try {
            return await Product
        } catch (error) {
            
        }
    }
}