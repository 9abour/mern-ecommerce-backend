import { Router } from "express";
import asyncWrapper from "../../middlewares/asyncWrapper";
import getAllProducts from "../../controllers/products/getAllProducts";
import { getAllCategoryProducts } from "../../controllers/products/getAllCategoryProducts";
import { createProduct } from "../../controllers/products/createProduct";
import { productCreationValidateInput } from "../../validators/products";
import checkAdminVerification from "../../middlewares/checkAdminVerification";
import checkUser from "../../middlewares/checkUser";
import { checkDuplicateProduct } from "../../middlewares/checkDuplicateProduct";

const productsRoutes = Router();

productsRoutes.get("/products", asyncWrapper(getAllProducts));
productsRoutes.post(
	"/products",
	checkUser,
	checkAdminVerification,
	productCreationValidateInput,
	checkDuplicateProduct,
	asyncWrapper(createProduct)
);
productsRoutes.get("/products/:category", asyncWrapper(getAllCategoryProducts));

export default productsRoutes;
