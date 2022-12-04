import { model, Schema } from "mongoose";

const purchaseSchema = new Schema(
    {
        shippingAdress: { type: String },
        album: { type: Schema.Types.ObjectId, ref: "Album" }
    }

);

const PurchaseModel = model("Purchase", purchaseSchema);

export default PurchaseModel;