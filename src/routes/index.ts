import { Router } from "express";
import productsRoutes from "./products";

const router = Router();

router.use(productsRoutes);

export default router;
