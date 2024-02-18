import bcrypt from "bcrypt";
import userModel from "../../../models/user.model";

const updatePassword = (email: string, newPassword: string) => {
	bcrypt.hash(newPassword, 10, (err, hashed) => {
		userModel.updateOne({
			email: email,
			$unset: { resetPassword: 1 },
			$set: { password: hashed },
		});
	});
};

export default updatePassword;
