import jwt from "jsonwebtoken";
import { IUser } from "../../../types/user.types";

class HandleTokenHelper {
	public static generateAccessToken = (refreshToken: string): string | null => {
		const secretKey: string = process.env.JWT_SECRET_KEY || "";
		const options = {
			expiresIn: "30m",
		};

		const decoded: any = jwt.verify(refreshToken, secretKey);

		if (!decoded) {
			return null;
		}

		const user = {
			email: decoded.email,
			userImage: decoded.image_url,
		};

		const accessToken = jwt.sign(user, secretKey, options);

		return accessToken;
	};

	public static generateRefreshToken = (user: IUser): string => {
		const secretKey: string = process.env.JWT_SECRET_KEY || "";

		const userPayload = {
			_id: user.id_,
			email: user.email,
			userImage: user.image_url,
		};

		const options = {
			expiresIn: "30d",
		};

		const refreshToken = jwt.sign(userPayload, secretKey, options);

		return refreshToken;
	};
}

export default HandleTokenHelper;
