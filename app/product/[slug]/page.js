import {one,list} from '@/lib/db';import {notFound} from 'next/navigation';import Buy from './Buy';import ProductCard from '@/components/ProductCard';
export const dynamic='force-dynamic';
export default async function Product({params}){const p=await one('products',{slug:params.slug,active:true});if(!p)notFound();
 const rel=(await list('products',{active:true,category:p.category||'',id:{$ne:p.id}},{created_at:-1},4));
 return <div className="wrap"><Buy p={p}/>{rel.length>0&&<section><h2 style={{marginBottom:24}}>You may also like</h2><div className="grid">{rel.map(r=><ProductCard key={r.id} p={r}/>)}</div></section>}</div>}
