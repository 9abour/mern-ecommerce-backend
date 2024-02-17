import jwt from "jsonwebtoken";
import { IUser } from "../../../types/user.types";

const generateRefreshToken = (user: IUser): string => {
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

export default generateRefreshToken;
