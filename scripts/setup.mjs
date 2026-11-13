import {MongoClient} from 'mongodb';
const c=await new MongoClient(process.env.MONGODB_URI).connect();const db=c.db(process.env.MONGODB_DB||'bm2sipware');
await db.collection('products').createIndexes([{key:{slug:1},unique:true},{key:{id:1},unique:true},{key:{active:1,created_at:-1}}]);
await db.collection('orders').createIndexes([{key:{id:1},unique:true},{key:{number:1},unique:true},{key:{created_at:-1}}]);
await db.collection('coupons').createIndex({code:1},{unique:true});
await db.collection('subscribers').createIndex({email:1},{unique:true});
console.log('Indexes ready');await c.close();
