import {NextResponse} from 'next/server';import {isAdmin} from '@/lib/admin';import {col,list} from '@/lib/db';
const g=h=>isAdmin()?h():NextResponse.json({},{status:401});
export const GET=()=>g(async()=>NextResponse.json(await list('coupons',{},{code:1})));
export const POST=req=>g(async()=>{const c=await req.json();const code=c.code.toUpperCase();await(await col('coupons')).updateOne({code},{$set:{code,type:c.type,value:+c.value,min_order:+c.min_order||0,active:c.active!==false}},{upsert:true});return NextResponse.json({})});
export const DELETE=req=>g(async()=>{const{code}=await req.json();await(await col('coupons')).deleteOne({code});return NextResponse.json({ok:true})});
