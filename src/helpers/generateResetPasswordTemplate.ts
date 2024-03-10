import fs from "fs";
import cheerio from "cheerio";

const generateResetPasswordTemplate = (resetPasswordLink: string): string => {
	const htmlContent: string = fs.readFileSync(
		"./public/assets/resetPasswordTemplate.html",
		"utf8"
	);

	const $ = cheerio.load(htmlContent);

	const resetLinkElement = $("#resetLink");

	resetLinkElement.attr("href", resetPasswordLink);

	return $.html();
};

export default generateResetPasswordTemplate;
