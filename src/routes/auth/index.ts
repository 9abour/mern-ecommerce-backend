import { Router } from "express";
import register from "../../controllers/auth/register";
import {
	loginValidateInput,
	registerValidateInput,
	resetPasswordValidateInput,
} from "../../validators/auth";
import asyncWrapper from "../../middlewares/asyncWrapper";
import verifyAccount from "../../controllers/auth/verify";
import login from "../../controllers/auth/login";
import sendResetPwd from "../../controllers/auth/sendResetPwd";

const authRoutes = Router();

authRoutes.post("/register", registerValidateInput, asyncWrapper(register));
authRoutes.post("/verify/:token", asyncWrapper(verifyAccount));
authRoutes.post("/login", loginValidateInput, asyncWrapper(login));
authRoutes.patch(
	"/sendResetPwd",
	resetPasswordValidateInput,
	asyncWrapper(sendResetPwd)
);

export default authRoutes;
