import {NextResponse} from 'next/server';import crypto from 'crypto';import {isAdmin} from '@/lib/admin';import {col,list,now} from '@/lib/db';import {uploadImage} from '@/lib/upload';
const deny=()=>NextResponse.json({error:'Unauthorized'},{status:401});
export async function GET(){if(!isAdmin())return deny();return NextResponse.json(await list('products'))}
export async function POST(req){if(!isAdmin())return deny();const f=await req.formData();const imgs=[];
 try{for(const file of f.getAll('files')){if(file.size)imgs.push(await uploadImage(file))}}catch(e){return NextResponse.json({error:e.message},{status:400})}
 const id=f.get('id');const row={name:f.get('name'),slug:f.get('slug'),description:f.get('description'),category:f.get('category'),price:+f.get('price'),compare_price:+f.get('compare_price')||null,qikink_sku:f.get('qikink_sku'),active:f.get('active')==='on',featured:f.get('featured')==='on'};
 if(imgs.length){row.images=imgs;row.design_url=f.get('design_url')||imgs[0]}else if(f.get('design_url'))row.design_url=f.get('design_url');
 const c=await col('products');
 try{if(id)await c.updateOne({id},{$set:row});else await c.insertOne({id:crypto.randomUUID(),sold:0,images:[],specs:{capacity:'330 ml',material:'Ceramic',finish:'Gloss',care:'Dishwasher and microwave safe'},created_at:now(),...row})}
 catch(e){return NextResponse.json({error:e.code===11000?'That slug is already used.':e.message},{status:400})}
 return NextResponse.json({})}
export async function DELETE(req){if(!isAdmin())return deny();const{id}=await req.json();await(await col('products')).deleteOne({id});return NextResponse.json({ok:true})}
