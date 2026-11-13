import {col} from './db';import {pushToQikink} from './qikink';import {sendMail,orderMail} from './mail';
export async function fulfil(order){const orders=await col('orders');
 if(!order.sold_counted){const p=await col('products');for(const i of order.items)await p.updateOne({id:i.id},{$inc:{sold:i.qty}});await orders.updateOne({id:order.id},{$set:{sold_counted:true}})}
 try{const q=await pushToQikink(order);await orders.updateOne({id:order.id},{$set:{qikink_order_id:String(q.order_id||q.id||''),qikink_status:'sent',status:'processing'}})}
 catch(e){await orders.updateOne({id:order.id},{$set:{qikink_status:'failed: '+String(e.message).slice(0,200)}})}
 await sendMail(order.email,`Order ${order.number} confirmed`,orderMail(order))}
