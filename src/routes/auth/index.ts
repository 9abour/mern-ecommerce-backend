import { Router } from "express";
import register from "../../controllers/auth/register";
import { registerValidateInput } from "../../validators/auth";
import asyncWrapper from "../../middlewares/asyncWrapper";
import verifyAccount from "../../controllers/auth/verifyAccount";

const authRoutes = Router();

authRoutes.post("/register", registerValidateInput, asyncWrapper(register));
authRoutes.post("/verify/:token", asyncWrapper(verifyAccount));

export default authRoutes;
