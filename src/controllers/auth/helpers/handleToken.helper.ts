import jwt from "jsonwebtoken";
import { IUser } from "../../../types/user.types";
import handleSendResponse from "../../../helpers/handleSendResponse";
import { NextFunction, Request, Response } from "express";
import { STATUS_TEXT } from "../../../enums/statusTexts.enums";
import dotenv from "dotenv";
import { IPublicUser } from "../../../types/customExpress.types";

dotenv.config();

class HandleTokenHelper {
	private static secretKey: string = process.env.JWT_SECRET_KEY || "";

	public static generateAccessToken = (refreshToken: string): string | null => {
		const options = {
			expiresIn: "30m",
		};

		const user: any = jwt.verify(refreshToken, HandleTokenHelper.secretKey);

		if (!user) {
			return null;
		}

		const { id, firstName, lastName, email, imageUrl, wishlist, cart, role } =
			user;

		const userPayload = {
			id: id.toString(),
			firstName,
			lastName,
			email,
			imageUrl,
			wishlist,
			cart,
			role,
		};

		const accessToken = jwt.sign(userPayload, this.secretKey, options);

		return accessToken;
	};

	public static generateRefreshToken = (user: IUser): string => {
		const { _id, firstName, lastName, email, imageUrl, wishlist, cart, role } =
			user;

		const userPayload = {
			id: _id?.toString(),
			firstName,
			lastName,
			email,
			imageUrl,
			wishlist,
			cart,
			role,
		};

		const options = {
			expiresIn: "30d",
		};

		const refreshToken = jwt.sign(userPayload, this.secretKey, options);

		return refreshToken;
	};

	public static checkToken = (
		token: string,
		errorMsg: string,
		res: Response,
		next: NextFunction
	) => {
		jwt.verify(token, this.secretKey, (error, decoded) => {
			if (error) {
				return handleSendResponse(
					res,
					null,
					[errorMsg],
					404,
					STATUS_TEXT.ERROR,
					next
				);
			}
		});
	};

	public static getUserInfo = (
		accessToken: string,
		res: Response,
		next: NextFunction
	): IPublicUser | void => {
		const decoded: any = jwt.verify(
			accessToken,
			this.secretKey,
			(error, decoded) => {
				if (error) {
					handleSendResponse(
						res,
						null,
						["Invalid token"],
						400,
						STATUS_TEXT.ERROR,
						next
					);
					return;
				}

				return decoded;
			}
		);

		return decoded;
	};

	public static getAuthToken = (req: Request): string | null => {
		const auth = req.headers.authorization;

		if (!auth) return null;

		const accessToken = auth.split(" ")[1];

		return accessToken;
	};
}

export default HandleTokenHelper;
