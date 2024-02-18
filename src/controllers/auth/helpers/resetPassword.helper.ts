import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import userModel from "../../../models/user.model";
import { Response, NextFunction } from "express";
import getUser from "./getUser";

class ResetPasswordHelper {
	public static updatePassword = (email: string, newPassword: string) => {
		bcrypt.hash(newPassword, 10, (err, hashed) => {
			userModel.updateOne({
				email: email,
				$unset: { resetPassword: 1 },
				$set: { password: hashed },
			});
		});
	};

	public static generateResetPasswordToken = async (
		email: string,
		res: Response,
		next: NextFunction
	) => {
		const secretKey: string = process.env.JWT_SECRET_KEY || "";
		const options = {
			expiresIn: "5m",
		};

		await getUser(email, res, next);

		const token = jwt.sign({ email }, secretKey, options);

		return token;
	};
}

export default ResetPasswordHelper;
