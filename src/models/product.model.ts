import mongoose, { model } from "mongoose";
import { ProductType } from "../types/product.types";
const { Schema } = mongoose;

const productSchema = new Schema<ProductType>({
	slug: String,
	name: String,
	description: String,
	imageUrl: String,
	categories: [String],
	count: {
		type: Number,
		default: 0,
	},
	rate: {
		default: 0,
		type: Number,
	},
	discount: {
		default: 0,
		type: Number,
	},
});

export default model<ProductType>("Product", productSchema);
