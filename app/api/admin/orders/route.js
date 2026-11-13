import {NextResponse} from 'next/server';import {isAdmin} from '@/lib/admin';import {col,list,one} from '@/lib/db';import {fulfil} from '@/lib/fulfil';
export async function GET(){if(!isAdmin())return NextResponse.json({},{status:401});return NextResponse.json(await list('orders',{},{created_at:-1},200))}
export async function PATCH(req){if(!isAdmin())return NextResponse.json({},{status:401});const{id,status,retryQikink,cod_paid}=await req.json();
 if(retryQikink){const o=await one('orders',{id});if(o)await fulfil(o)}
 const patch={};if(status)patch.status=status;if(cod_paid)patch.payment_status='paid';
 if(Object.keys(patch).length)await(await col('orders')).updateOne({id},{$set:patch});return NextResponse.json({ok:true})}
