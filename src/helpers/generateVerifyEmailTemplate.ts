import cheerio from "cheerio";

const generateVerifyEmailTemplate = (
	htmlContent: string,
	verifyLink: string
) => {
	{
		const $ = cheerio.load(htmlContent);

		const confirmLinkElement = $("#confirmLink");

		if (confirmLinkElement.length === 0) {
			console.error('Confirm link element with id "confirmLink" not found');
			return;
		}

		confirmLinkElement.attr("href", verifyLink);

		const generatedVerifyEmailTemplate = $.html();

		return generatedVerifyEmailTemplate;
	}
};

export default generateVerifyEmailTemplate;
