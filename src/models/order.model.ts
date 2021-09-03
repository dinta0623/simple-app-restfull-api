import { model, Schema, Document } from "mongoose";
import { ICart } from "./cart.model";

export interface IOrder extends Document {
    date: Date
    carts: [ICart]
}

export default model<IOrder>("order",
    new Schema({
        date: Date,
        carts: Array
    }, { timestamps: true })
)