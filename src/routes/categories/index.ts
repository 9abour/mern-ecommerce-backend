import { Router } from "express";
import asyncWrapper from "../../middlewares/asyncWrapper";
import createCategory from "../../controllers/categories/createCategory";
import checkUser from "../../middlewares/checkUser";
import checkAdminVerification from "../../middlewares/checkAdminVerification";
import { categoryCreationValidateInput } from "../../validators/categories";
import { checkDuplicateCategory } from "../../middlewares/checkDuplicateCategory";
import { searchCategories } from "../../controllers/categories/searchCategories";

const categoriesRoutes = Router();

categoriesRoutes.post(
	"/categories",
	checkUser,
	checkAdminVerification,
	categoryCreationValidateInput,
	checkDuplicateCategory,
	asyncWrapper(createCategory)
);
categoriesRoutes.get("/categories", asyncWrapper(searchCategories));

export default categoriesRoutes;
