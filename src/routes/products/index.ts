import { Router } from "express";
import asyncWrapper from "../../middlewares/asyncWrapper";
import getAllProducts from "../../controllers/products/getAllProducts";
import { getAllCategoryProducts } from "../../controllers/products/getAllCategoryProducts";
import { createProduct } from "../../controllers/products/createProduct";
import { productCreationValidateInput } from "../../validators/products";
import checkAdminVerification from "../../middlewares/checkAdminVerification";
import checkUser from "../../middlewares/checkUser";
import { checkDuplicateProduct } from "../../middlewares/checkDuplicateProduct";
import { filterProducts } from "../../controllers/products/filterProducts";

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
productsRoutes.get("/filter-products", asyncWrapper(filterProducts));

export default productsRoutes;
