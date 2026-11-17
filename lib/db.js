import {MongoClient} from 'mongodb';
export {inr,SHIPPING,COD_FEE} from './format';
const g=globalThis;
export const getDb=async()=>{
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) throw new Error('MONGODB_URI not defined');
    g._mongo??=new MongoClient(uri, { serverSelectionTimeoutMS: 1500 }).connect();
    return (await g._mongo).db(process.env.MONGODB_DB||'bm2sipware');
  } catch (e) {
    console.warn('MongoDB connection unavailable, using comprehensive mock fallback:', e.message);
    return null;
  }
};
g._mock_orders ??= [];
g._mock_coupons ??= [];
g._mock_products ??= [];

export const col=async n=>{
  const db = await getDb();
  if (!db) {
    if (n === 'orders') {
      return {
        find: () => ({ sort: () => ({ limit: () => ({ toArray: async () => g._mock_orders }) }) }),
        findOne: async (q) => {
          return g._mock_orders.find(o =>
            (!q.id || o.id === q.id) &&
            (!q.number || o.number === q.number) &&
            (!q.razorpay_order_id || o.razorpay_order_id === q.razorpay_order_id)
          ) || null;
        },
        insertOne: async (doc) => {
          g._mock_orders.unshift(doc);
          return { insertedId: doc.id };
        },
        updateOne: async (q, update) => {
          const ord = g._mock_orders.find(o =>
            (!q.id || o.id === q.id) &&
            (!q.number || o.number === q.number) &&
            (!q.razorpay_order_id || o.razorpay_order_id === q.razorpay_order_id)
          );
          if (ord && update.$set) Object.assign(ord, update.$set);
          return { modifiedCount: ord ? 1 : 0 };
        },
        deleteOne: async (q) => {
          const idx = g._mock_orders.findIndex(o => !q.id || o.id === q.id);
          if (idx !== -1) g._mock_orders.splice(idx, 1);
          return { deletedCount: idx !== -1 ? 1 : 0 };
        }
      };
    }
    if (n === 'coupons') {
      return {
        find: () => ({ sort: () => ({ limit: () => ({ toArray: async () => g._mock_coupons }) }) }),
        findOne: async (q) => g._mock_coupons.find(c => !q.code || c.code === q.code) || null,
        insertOne: async (doc) => {
          const idx = g._mock_coupons.findIndex(c => c.code === doc.code);
          if (idx !== -1) g._mock_coupons[idx] = doc;
          else g._mock_coupons.push(doc);
          return {insertedId: doc.code};
        },
        updateOne: async (q, update) => {
          const doc = update.$set || update;
          const code = q.code || doc.code;
          const idx = g._mock_coupons.findIndex(c => c.code === code);
          if (idx !== -1) {
            Object.assign(g._mock_coupons[idx], doc);
          } else {
            g._mock_coupons.push({ code, type: 'percent', value: 10, min_order: 0, active: true, ...doc });
          }
          return { modifiedCount: 1 };
        },
        deleteOne: async (q) => {
          const idx = g._mock_coupons.findIndex(c => c.code === q.code);
          if (idx !== -1) g._mock_coupons.splice(idx, 1);
          return { deletedCount: idx !== -1 ? 1 : 0 };
        }
      };
    }
    if (g._mock_products.length === 0) {
      g._mock_products.push(...MOCK_PRODUCTS.map(p => ({...p, qikink_sku: p.qikink_sku || 'coding_1'})));
    }
    return {
      find: () => ({ sort: () => ({ limit: () => ({ toArray: async () => g._mock_products }) }) }),
      findOne: async (q) => g._mock_products.find(p => p.id === q.id || p.slug === q.slug) || null,
      insertOne: async (doc) => { g._mock_products.push(doc); return {insertedId: doc.id}; },
      updateOne: async (q, update) => {
        const prod = g._mock_products.find(p => p.id === q.id);
        if (prod && update.$set) Object.assign(prod, update.$set);
        if (prod && update.$inc) {
          for (const [k, v] of Object.entries(update.$inc)) {
            prod[k] = (prod[k] || 0) + v;
          }
        }
        return { modifiedCount: prod ? 1 : 0 };
      },
      deleteOne: async (q) => {
        const idx = g._mock_products.findIndex(p => p.id === q.id);
        if (idx !== -1) g._mock_products.splice(idx, 1);
        return { deletedCount: idx !== -1 ? 1 : 0 };
      }
    };
  }
  return db.collection(n);
};
const P={projection:{_id:0}};

const MOCK_PRODUCTS = [
  {
    id: 'coding-1', slug: 'coding-1-developer-vibe', title: 'Coding 1: Developer Vibe Art Mug', category: 'Technology', niche: 'Technology', type: 'Trending',
    price: 499, compare_at_price: 699, sold: 195, active: true, featured: true, created_at: '2026-01-01T00:00:00.000Z',
    sizes: [{name: '11 OZ (325 ml)', price: 499}],
    images: [
      '/designs/coding_1/images/1.jpg',
      '/designs/coding_1/coding_1.png',
      '/designs/coding_1/images/2.png',
      '/designs/coding_1/images/3.png',
      '/designs/coding_1/images/4.png',
      '/designs/coding_1/images/5.png',
      '/designs/coding_1/images/Gemini123456.png',
      '/designs/coding_1/images/Black Ceramic Coffee Mug.png'
    ],
    description: 'Exclusive Coding 1 developer artwork printed on high-grade ceramic. Microwave and dishwasher safe.',
    specs: {material: 'Ceramic', print: 'HD Sublimation', capacity: '325ml', care: 'Dishwasher & microwave safe'}
  },
  {
    id: 'coding-2', slug: 'coding-2w-masterpiece', title: 'Coding 2W: Code & Caffeine Mug', category: 'Technology', niche: 'Technology', type: 'Trending',
    price: 520, compare_at_price: 750, sold: 180, active: true, featured: true, created_at: '2026-01-02T00:00:00.000Z',
    sizes: [{name: '11 OZ (325 ml)', price: 520}],
    images: [
      '/designs/coding_2_w/images/1.jpg',
      '/designs/coding_2_w/coding_2_w.png',
      '/designs/coding_2_w/images/2.png',
      '/designs/coding_2_w/images/3.png',
      '/designs/coding_2_w/images/4.png',
      '/designs/coding_2_w/images/Aluminium Sipper Bottle.png'
    ],
    description: 'Coding 2W custom printed masterpiece for software engineers and tech enthusiasts.',
    specs: {material: 'Ceramic', print: 'HD Sublimation', capacity: '325ml', care: 'Dishwasher & microwave safe'}
  }
];

export const list=async(n,q={},sort={created_at:-1},limit=0)=>{
  try {
    const c = await col(n);
    if (n === 'products') {
      const mockIds = MOCK_PRODUCTS.map(p => p.id);
      await c.deleteMany({ id: { $nin: mockIds } });
      for (const mp of MOCK_PRODUCTS) {
        await c.updateOne({ id: mp.id }, { $set: { ...mp, qikink_sku: mp.qikink_sku || 'coding_1' } }, { upsert: true });
      }
    }
    let items = await c.find(q,P).sort(sort).limit(limit).toArray();
    return items;
  } catch (e) {
    console.warn(`list error for ${n}:`, e.message);
    if (n === 'products') {
      let res = [...MOCK_PRODUCTS];
      if (q.category) res = res.filter(p => q.category ? p.category === q.category : true);
      if (q.niche) res = res.filter(p => q.niche ? p.niche === q.niche : true);
      if (q.active !== undefined) res = res.filter(p => p.active === q.active);
      return limit ? res.slice(0, limit) : res;
    }
    return [];
  }
};
export const one=async(n,q)=>{
  try {
    const c = await col(n);
    let item = await c.findOne(q,P);
    if (!item && n === 'products') {
      const mp = MOCK_PRODUCTS.find(p => p.id === q.id || p.slug === q.slug);
      if (mp) {
        await c.updateOne({ id: mp.id }, { $set: { ...mp, qikink_sku: mp.qikink_sku || 'coding_1' } }, { upsert: true });
        item = await c.findOne(q,P);
      }
    }
    return item;
  } catch (e) {
    console.warn(`one error for ${n}:`, e.message);
    if (n === 'products') {
      return MOCK_PRODUCTS.find(p => p.id === q.id || p.slug === q.slug) || null;
    }
    return null;
  }
};
export const now=()=>new Date().toISOString();
