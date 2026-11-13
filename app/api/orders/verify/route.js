import crypto from 'crypto';import {NextResponse} from 'next/server';import {col,one} from '@/lib/db';import {fulfil} from '@/lib/fulfil';
export async function POST(req){const{id,razorpay_order_id,razorpay_payment_id,razorpay_signature}=await req.json();const orders=await col('orders');
 const o=await one('orders',{id,razorpay_order_id});if(!o)return NextResponse.json({error:'not found'},{status:404});
 const isMock = !razorpay_order_id || razorpay_order_id.startsWith('order_mock_') || process.env.RAZORPAY_KEY_SECRET === 'demo';
 const exp = isMock ? (razorpay_signature || 'mock') : crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET).update(razorpay_order_id+'|'+razorpay_payment_id).digest('hex');
 if(!isMock && exp!==razorpay_signature){await orders.updateOne({id,payment_status:'pending'},{$set:{payment_status:'failed'}});return NextResponse.json({error:'bad signature'},{status:400})}
 if(o.payment_status==='paid')return NextResponse.json({ok:true});
 await orders.updateOne({id},{$set:{payment_status:'paid',razorpay_payment_id}});await fulfil({...o,payment_status:'paid',razorpay_payment_id});return NextResponse.json({ok:true})}
