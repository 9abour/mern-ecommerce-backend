const generateSlugFromText = (inputText: string): string => {
	const lowercaseText = inputText.toLowerCase();
	const slug = lowercaseText.replace(/\s+/g, "-");
	return slug;
};

export { generateSlugFromText };
