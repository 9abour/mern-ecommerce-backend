import jwt from "jsonwebtoken";

const generateAccessToken = (refreshToken: string): string | null => {
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
		userImage: decoded.userImage,
	};

	const accessToken = jwt.sign(user, secretKey, options);

	return accessToken;
};

export default generateAccessToken;
