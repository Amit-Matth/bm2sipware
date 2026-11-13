import {col,now} from '@/lib/db';import {NextResponse} from 'next/server';
export async function POST(req){const f=await req.formData();const email=String(f.get('email')||'').toLowerCase();
 if(/^\S+@\S+\.\S+$/.test(email))await(await col('subscribers')).updateOne({email},{$setOnInsert:{email,created_at:now()}},{upsert:true});return NextResponse.redirect(new URL('/?subscribed=1',req.url),303)}
