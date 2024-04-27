import { Router } from "express";
import productsRoutes from "./products";
import authRoutes from "./auth";
import categoriesRoutes from "./categories";

const router = Router();

router.use(productsRoutes);
router.use(authRoutes);
router.use(categoriesRoutes);
export default router;
