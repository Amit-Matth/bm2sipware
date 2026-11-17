export const inr = n => {
  const num = Math.round(Number(n || 0));
  return '₹' + num.toLocaleString('en-IN');
};

export const DELIVERY_FEE_PER_UNIT = 30;
export const HANDLING_FEE_PER_UNIT = 20;
export const GIFT_PACKAGING_PER_UNIT = 47;

export const calcDeliveryFee = (qty) => Math.round((qty || 0) * DELIVERY_FEE_PER_UNIT);
export const calcHandlingFee = (qty, mode) => mode === 'cod' ? Math.round((qty || 0) * HANDLING_FEE_PER_UNIT) : 0;
export const calcGiftFee = (qty, giftEnabled) => giftEnabled ? Math.round((qty || 0) * GIFT_PACKAGING_PER_UNIT) : 0;

export const SHIPPING = sub => 30;
export const COD_FEE = 20;
