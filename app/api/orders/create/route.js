import {col, list, now} from '@/lib/db';
import {NextResponse} from 'next/server';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import {quote} from '@/lib/coupon';
import {fulfil} from '@/lib/fulfil';
import {
  calcDeliveryFee,
  calcHandlingFee,
  calcGiftFee
} from '@/lib/format';

const bad = (m, s = 400) => NextResponse.json({error: m}, {status: s});

export async function POST(req) {
  try {
    const {customer: c, address: a, items, coupon, mode, giftPackaging} = await req.json();

    if(!c?.name || !/^\S+@\S+\.\S+$/.test(c.email||'') || !/^[6-9]\d{9}$/.test(c.phone||'') || !/^\d{6}$/.test(a?.pincode||'') || !a.line1 || !a.city || !a.state) {
      return bad('Please check your contact and address details.');
    }

    if(!['online','cod'].includes(mode) || !Array.isArray(items) || !items.length) {
      return bad('Invalid order.');
    }

    const ps = await list('products', {id: {$in: items.map(i => String(i.id))}, active: true}, {});
    const lines = items.map(i => {
      const p = ps.find(x => x.id === i.id);
      const q = Math.min(20, Math.max(1, parseInt(i.qty) || 1));
      return p && {
        id: p.id,
        slug: p.slug,
        name: p.name,
        price: p.price,
        qty: q,
        qikink_sku: p.qikink_sku || 'coding_1',
        design_url: p.design_url,
        image: p.images?.[0]
      };
    });

    if(lines.includes(undefined)) return bad('A product in your cart is no longer available.');

    const subtotal = lines.reduce((s, l) => s + l.price * l.qty, 0);
    const totalQty = lines.reduce((s, l) => s + l.qty, 0);

    if (mode === 'cod' && totalQty > 2) {
      return bad('Cash on Delivery (COD) is available for up to 2 items only. Please select Online (Prepaid) for orders with 3 or more items.');
    }

    const discount = 0;
    const deliveryFee = calcDeliveryFee(totalQty);
    const handlingFee = calcHandlingFee(totalQty, mode);
    const giftFee = calcGiftFee(totalQty, giftPackaging);

    const total = Math.max(0, Math.round(subtotal - discount + deliveryFee + handlingFee + giftFee));
    const number = 'MUG' + Date.now().toString(36).toUpperCase();

    const o = {
      id: crypto.randomUUID(),
      number,
      name: c.name,
      email: c.email.toLowerCase(),
      phone: c.phone,
      address: a,
      items: lines,
      subtotal,
      delivery_fee: deliveryFee,
      handling_fee: handlingFee,
      gift_fee: giftFee,
      gift_packaging: !!giftPackaging,
      discount,
      total,
      coupon: coupon || null,
      payment_mode: mode,
      payment_status: mode === 'cod' ? 'cod_pending' : 'pending',
      status: 'placed',
      created_at: now()
    };

    const orders = await col('orders');
    await orders.insertOne({...o});

    if(mode === 'cod') {
      await fulfil(o);
      return NextResponse.json({id: o.id, number});
    }

    let roId;
    let roAmount = total * 100;
    try {
      const rz = new Razorpay({
        key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET
      });
      const ro = await rz.orders.create({amount: roAmount, currency: 'INR', receipt: number});
      roId = ro.id;
    } catch (rzErr) {
      console.warn('Razorpay live order creation failed (using test mock order):', rzErr.message);
      roId = 'order_mock_' + Date.now();
    }

    await orders.updateOne({id: o.id}, {$set: {razorpay_order_id: roId}});

    return NextResponse.json({
      id: o.id,
      number,
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: roAmount,
      razorpay_order_id: roId
    });
  } catch (e) {
    console.error('Order creation error:', e);
    return bad(e.message || 'Server error during order creation', 500);
  }
}
