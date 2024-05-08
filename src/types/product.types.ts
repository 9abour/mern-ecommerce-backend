export type ProductType = {
	_id: string;
	slug: string;
	name: string;
	description: string;
	imageUrl: string;
	categories: string[];
	in_stock: number;
	rate: number;
	discount: number;
};
