import { NextFunction, Request, Response } from "express";

const refreshToken = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const currentMethod = req.method;

	if (currentMethod == "delete") {
	}
};
