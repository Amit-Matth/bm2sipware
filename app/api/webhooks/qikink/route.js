import {col} from '@/lib/db';import {NextResponse} from 'next/server';
// Point Qikink's webhook at /api/webhooks/qikink?secret=QIKINK_WEBHOOK_SECRET. Map fields to Qikink's real payload.
export async function POST(req){if(new URL(req.url).searchParams.get('secret')!==process.env.QIKINK_WEBHOOK_SECRET)return NextResponse.json({},{status:401});
 const b=await req.json();const st=String(b.status||'').toLowerCase();
 await(await col('orders')).updateOne({number:b.order_number},{$set:{qikink_status:st,tracking_url:b.tracking_url||b.awb_url||null,...(st.includes('deliver')?{status:'delivered'}:st.includes('ship')?{status:'shipped'}:{})}});return NextResponse.json({ok:true})}
