import { Router } from "express";
import register from "../../controllers/auth/register";
import { registerValidateInput } from "../../validators/auth";
import asyncWrapper from "../../middlewares/asyncWrapper";

const authRoutes = Router();

authRoutes.post("/register", registerValidateInput, asyncWrapper(register));

export default authRoutes;
