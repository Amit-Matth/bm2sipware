import {one} from './db';
export async function quote(code,subtotal){if(!code)return{discount:0};const c=await one('coupons',{code:String(code).toUpperCase(),active:true});
 if(!c)return{error:'This coupon is not valid.'};if(subtotal<c.min_order)return{error:`Add items worth ₹${c.min_order} or more to use this coupon.`};
 return{discount:Math.min(subtotal,c.type==='percent'?Math.round(subtotal*c.value/100):c.value)}}
