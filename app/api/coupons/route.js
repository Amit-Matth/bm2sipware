import {NextResponse} from 'next/server';import {quote} from '@/lib/coupon';
export async function POST(req){const{code,subtotal}=await req.json();const r=await quote(code,subtotal);return NextResponse.json(r,{status:r.error?400:200})}
