import { Router } from "express";
import asyncWrapper from "../../middlewares/asyncWrapper";
import getAllProducts from "../../controllers/products/getAllProducts";

const productsRoutes = Router();

productsRoutes.get("/products", asyncWrapper(getAllProducts));

export default productsRoutes;
