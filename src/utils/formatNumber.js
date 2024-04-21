export function formatNumber(number) {
	if (number % 1 !== 0) {
		// Check if number has decimal places
		const roundedNumber = parseFloat(number.toFixed(2));
		return roundedNumber.toString();
	}
	return number.toString();
}
