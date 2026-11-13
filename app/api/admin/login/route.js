import {NextResponse} from 'next/server';import {makeToken} from '@/lib/admin';
export async function POST(req){const{password}=await req.json();if(!process.env.ADMIN_PASSWORD||password!==process.env.ADMIN_PASSWORD)return NextResponse.json({error:'Wrong password'},{status:401});
 const r=NextResponse.json({ok:true});r.cookies.set('admin',makeToken(),{httpOnly:true,secure:process.env.NODE_ENV==='production',sameSite:'strict',path:'/',maxAge:604800});return r}
