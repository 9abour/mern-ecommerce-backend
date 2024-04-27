import fs from "fs";
import cheerio from "cheerio";

const generateVerifyEmailTemplate = (verifyLink: string): string => {
	const htmlContent: string = fs.readFileSync(
		"./public/assets/verifyEmailTemplate.html",
		"utf8"
	);

	const $ = cheerio.load(htmlContent);

	const confirmLinkElement = $("#confirmLink");

	confirmLinkElement.attr("href", verifyLink);

	return $.html();
};

export default generateVerifyEmailTemplate;
