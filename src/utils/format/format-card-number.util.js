/**
 * Formats a card number into the format **** **** **** ****.
 * @param {string} cardNumber - The card number consisting of 16 digits without separators.
 * @returns {string} The formatted card number.
 */
export function formatCardNumber(cardNumber) {
	const formattedNumber = cardNumber.replace(/\s/g, '').match(/.{1,4}/g)

	return formattedNumber ? formattedNumber.join(' ') : ''
}

/**
 * Formats a card number string by adding dashes (-) after every 4th character.
 * @param {string} cardNumber - The card number string to format.
 *
 * @return {string} - Returns the formatted card number string.
 */
export function formatCardNumberWithDashes(cardNumber) {
	return cardNumber.replace(/(\d{4})(?=\d)/g, '$1-')
}
