import { ProductType } from "./product.types";
export type CategoryType = {
	_id: string;
	slug: string;
	name: string;
	products: ProductType[];
	imageUrl: string;
	color: string;
};
