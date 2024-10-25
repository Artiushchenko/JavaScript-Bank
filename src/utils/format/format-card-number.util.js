/**
 * Formats a card number string by adding dashes (-) after every 4th character.
 * @param {string} cardNumber - The card number string to format.
 *
 * @return {string} - Returns the formatted card number string.
 */
export function formatCardNumberWithDashes(cardNumber) {
	return cardNumber.replace(/(\d{4})(?=\d)/g, '$1-')
}
