import bcrypt from "bcrypt";

/**
 * Asynchronous function to check if the provided password matches the hashed password.
 *
 * @param {string} planPassword - The plain text password to be checked.
 * @param {string} hash - The hashed password to compare against.
 * @param {any} callback - The callback function to be called if the passwords do not match.
 */

const checkUserPassword = async (
	planPassword: string,
	hash: string,
	callback: Function
) => {
	const passwordMatch = await bcrypt.compare(planPassword, hash);

	if (!passwordMatch) {
		return callback();
	}
};

export default checkUserPassword;
