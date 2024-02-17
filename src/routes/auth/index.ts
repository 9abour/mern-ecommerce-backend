import { Router } from "express";
import register from "../../controllers/auth/register";
import {
	loginValidateInput,
	registerValidateInput,
	resetPasswordValidateInput,
	sendResetPasswordValidateInput,
} from "../../validators/auth";
import asyncWrapper from "../../middlewares/asyncWrapper";
import verifyAccount from "../../controllers/auth/verify";
import login from "../../controllers/auth/login";
import sendResetPwd from "../../controllers/auth/sendResetPwd";
import resetPassword from "../../controllers/auth/resetPassword";

const authRoutes = Router();

authRoutes.post("/register", registerValidateInput, asyncWrapper(register));
authRoutes.post("/verify/:token", asyncWrapper(verifyAccount));
authRoutes.post("/login", loginValidateInput, asyncWrapper(login));
authRoutes.patch(
	"/sendResetPwd",
	sendResetPasswordValidateInput,
	asyncWrapper(sendResetPwd)
);
authRoutes.patch(
	"/resetPassword/:token",
	resetPasswordValidateInput,
	asyncWrapper(resetPassword)
);

export default authRoutes;
