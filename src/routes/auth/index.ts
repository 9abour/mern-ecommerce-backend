import { Router } from "express";
import register from "../../controllers/auth/register";
import {
	loginValidateInput,
	registerValidateInput,
} from "../../validators/auth";
import asyncWrapper from "../../middlewares/asyncWrapper";
import verifyAccount from "../../controllers/auth/verify";
import login from "../../controllers/auth/login";

const authRoutes = Router();

authRoutes.post("/register", registerValidateInput, asyncWrapper(register));
authRoutes.post("/verify/:token", asyncWrapper(verifyAccount));
authRoutes.post("/login", loginValidateInput, asyncWrapper(login));

export default authRoutes;
