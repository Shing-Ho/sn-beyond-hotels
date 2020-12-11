export const commaFormat = text => {
	return text.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};
