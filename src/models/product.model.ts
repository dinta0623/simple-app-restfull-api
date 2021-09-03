import { model, Schema, Document } from "mongoose";

export interface IProduct extends Document {
    name: String
    desc: String
    pict: String
    price: Number
}

export default model<IProduct>("product",
    new Schema({
        name: {
            type: String
        },
        desc: {
            type: String
        },
        pict: {
            type: String
        },
        price: {
            type: Number
        },
    }, { timestamps: true })
)