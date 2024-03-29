import mongoose, { model } from "mongoose";
import { IProduct } from "../types/product.types";
const { Schema } = mongoose;

const productSchema = new Schema<IProduct>({
  slug: String,
  name: String,
  description: String,
  image_url: String,
  tags: [String],
  in_stock: Number,
  rate: Number,
});

export default model<IProduct>("Product", productSchema);
