export const inr = n => {
  const num = Number(n || 0);
  return '₹' + (Number.isInteger(num) ? num.toLocaleString('en-IN') : num.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
};

export const DELIVERY_FEE_PER_UNIT = 30;
export const HANDLING_FEE_PER_UNIT = 40.12;
export const GIFT_PACKAGING_PER_UNIT = 47.2;

export const calcDeliveryFee = (qty) => (qty || 0) * DELIVERY_FEE_PER_UNIT;
export const calcHandlingFee = (qty, mode) => mode === 'cod' ? (qty || 0) * HANDLING_FEE_PER_UNIT : 0;
export const calcGiftFee = (qty, giftEnabled) => giftEnabled ? (qty || 0) * GIFT_PACKAGING_PER_UNIT : 0;

export const SHIPPING = sub => 30;
export const COD_FEE = 40.12;
