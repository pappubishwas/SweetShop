import { Schema, model } from "mongoose";

export interface ISweet {
  name: string;
  category: string;
  price: number;
  quantity: number;
  description?: string;
  createdBy?: string;
}

const SweetSchema = new Schema<ISweet>({
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, default: 0 },
  description: { type: String },
  createdBy: { type: Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

export default model<ISweet>("Sweet", SweetSchema);
