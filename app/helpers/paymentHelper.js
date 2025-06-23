/**
 * Formats payment method information for display
 * @param {Object} transaction - Transaction object with payment method details
 * @returns {string} Formatted payment method string
 */
export const formatPaymentMethod = (transaction) => {
  if (!transaction) return "Unknown";

  // If we have masked card data, use it
  if (transaction.masked_card) {
    return transaction.masked_card;
  }

  // Fallback to constructing from individual fields
  if (transaction.card_brand && transaction.card_last4) {
    if (transaction.card_brand === "PAYPAL") {
      return "PayPal";
    }
    return `${transaction.card_brand} / **** **** **** ${transaction.card_last4}`;
  }

  // If no card details, assume PayPal
  return "PayPal";
};

/**
 * Gets the payment method brand for display
 * @param {Object} transaction - Transaction object
 * @returns {string} Payment method brand
 */
export const getPaymentBrand = (transaction) => {
  if (!transaction) return "Unknown";

  if (transaction.card_brand) {
    return transaction.card_brand === "PAYPAL"
      ? "PayPal"
      : transaction.card_brand;
  }

  return "PayPal";
};

/**
 * Gets the last 4 digits of the card
 * @param {Object} transaction - Transaction object
 * @returns {string} Last 4 digits or "PayPal"
 */
export const getCardLast4 = (transaction) => {
  if (!transaction) return "****";

  if (transaction.card_last4) {
    return transaction.card_last4 === "PAYPAL"
      ? "PayPal"
      : transaction.card_last4;
  }

  return "****";
};
