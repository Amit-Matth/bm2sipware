import {one} from '@/lib/db';import {NextResponse} from 'next/server';
export async function POST(req){const{number,email}=await req.json();
 const o=await one('orders',{number:String(number).trim().toUpperCase(),email:String(email).trim().toLowerCase()});
 return o?NextResponse.json({id:o.id}):NextResponse.json({error:'No order matches those details.'},{status:404})}
