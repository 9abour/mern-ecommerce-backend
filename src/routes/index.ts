import { Router } from "express";
import productsRoutes from "./products";
import authRoutes from "./auth";

const router = Router();

router.use(productsRoutes);
router.use(authRoutes);
export default router;
