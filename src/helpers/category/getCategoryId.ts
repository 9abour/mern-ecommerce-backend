import categoryModel from "../../models/category.model";

const getCategoryId = async (categorySlug: string) => {
	const categoryData = await categoryModel.findOne({ slug: categorySlug });

	if (!categoryData) {
		return null;
	}

	const categoryId = categoryData._id.toString();

	return categoryId;
};

export { getCategoryId };
