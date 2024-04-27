import { CategoryType } from "./../types/category.types";
import { Schema, model } from "mongoose";

const categorySchema = new Schema<CategoryType>({
	name: String,
	slug: String,
	products: [Object],
	imageUrl: String,
	color: String,
});

export default model<CategoryType>("Category", categorySchema);
