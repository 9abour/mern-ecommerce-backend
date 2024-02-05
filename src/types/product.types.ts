export type IProduct = {
  _id: string;
  slug: string;
  name: string;
  description: string;
  image_url: string;
  tags: string[];
  in_stock: number;
  rate: number;
};
