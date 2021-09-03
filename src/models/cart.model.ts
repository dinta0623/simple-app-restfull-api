import { model, Schema, Document } from "mongoose";
import { IProduct } from "./product.model";

export interface ICart extends Document {
    qty: Number
    desc: String
    products: IProduct
}

export default model<ICart>("cart",
    new Schema({
        qty: Number,
        desc: String,
        products: Object
    }, { timestamps: true })
)