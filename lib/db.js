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
        insertOne: async (doc) => { g._mock_coupons.push(doc); return {insertedId: doc.code}; },
        updateOne: async () => ({ modifiedCount: 1 }),
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
    id: 'coding-1', slug: 'coding-1-developer-vibe', title: 'Coding 1: Developer Vibe Art Mug', category: 'Corporate Engineers', niche: 'Corporate Engineers', type: 'Trending',
    price: 499, compare_at_price: 699, sold: 195, active: true, featured: true, created_at: '2026-01-01T00:00:00.000Z',
    sizes: [{name: '11 OZ (325 ml)', price: 499}, {name: '25 OZ (750 ml)', price: 899}],
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
    specs: {material: 'Ceramic', print: 'HD Sublimation', capacity: '325ml / 750ml', care: 'Dishwasher & microwave safe'}
  },
  {
    id: 'coding-2', slug: 'coding-2w-masterpiece', title: 'Coding 2W: Code & Caffeine Mug', category: 'Corporate Engineers', niche: 'Corporate Engineers', type: 'Trending',
    price: 520, compare_at_price: 750, sold: 180, active: true, featured: true, created_at: '2026-01-02T00:00:00.000Z',
    sizes: [{name: '11 OZ (325 ml)', price: 520}, {name: '25 OZ (750 ml)', price: 920}],
    images: [
      '/designs/coding_2_w/images/1.jpg',
      '/designs/coding_2_w/coding_2_w.png',
      '/designs/coding_2_w/images/2.png',
      '/designs/coding_2_w/images/3.png',
      '/designs/coding_2_w/images/4.png',
      '/designs/coding_2_w/images/Aluminium Sipper Bottle.png'
    ],
    description: 'Coding 2W custom printed masterpiece for software engineers and tech enthusiasts.',
    specs: {material: 'Ceramic', print: 'HD Sublimation', capacity: '325ml / 750ml', care: 'Dishwasher & microwave safe'}
  },
  {
    id: 'prod-white-mug', slug: 'white-ceramic-coffee-mug', title: 'White Ceramic Coffee Mug', category: 'Ceramic Mugs', niche: 'Original Sipware', type: 'Bestseller',
    price: 499, compare_at_price: 699, sold: 240, active: true, featured: true, created_at: '2026-01-03T00:00:00.000Z',
    sizes: [{name: '11 OZ (325 ml)', price: 499}, {name: '25 OZ (750 ml)', price: 899}],
    images: ['/products/White Ceramic Coffee Mug.avif'],
    description: 'Classic white ceramic coffee mug with ultra-glossy HD sublimation print.',
    specs: {material: 'Ceramic', print: 'HD Sublimation', capacity: '325ml / 750ml', care: 'Dishwasher & microwave safe'}
  },
  {
    id: 'prod-black-mug', slug: 'black-ceramic-coffee-mug', title: 'Black Ceramic Coffee Mug', category: 'Ceramic Mugs', niche: 'Original Sipware', type: 'Trending',
    price: 520, compare_at_price: 720, sold: 190, active: true, featured: true, created_at: '2026-01-04T00:00:00.000Z',
    sizes: [{name: '11 OZ (325 ml)', price: 520}, {name: '25 OZ (750 ml)', price: 920}],
    images: ['/products/Black Ceramic Coffee Mug.avif'],
    description: 'Sleek black ceramic coffee mug designed for bold artwork and daily caffeine.',
    specs: {material: 'Ceramic', print: 'HD Sublimation', capacity: '325ml / 750ml', care: 'Dishwasher & microwave safe'}
  },
  {
    id: 'prod-enamel-mug', slug: 'white-enamel-mug', title: 'White Enamel Mug', category: 'Enamel Mugs', niche: 'Original Sipware', type: 'Classic',
    price: 499, compare_at_price: 699, sold: 145, active: true, featured: false, created_at: '2026-01-05T00:00:00.000Z',
    sizes: [{name: '11 OZ (325 ml)', price: 499}, {name: '25 OZ (750 ml)', price: 899}],
    images: ['/products/White Enamel Mug.avif'],
    description: 'Retro camp-style white enamel mug, durable and lightweight.',
    specs: {material: 'Enamel Steel', print: 'HD Sublimation', capacity: '350ml', care: 'Hand wash recommended'}
  },
  {
    id: 'prod-magic-mug', slug: 'magic-ceramic-coffee-mug', title: 'Magic Ceramic Coffee Mug', category: 'Magic Mugs', niche: 'Original Sipware', type: 'Trending',
    price: 549, compare_at_price: 799, sold: 210, active: true, featured: true, created_at: '2026-01-06T00:00:00.000Z',
    sizes: [{name: '11 OZ (325 ml)', price: 549}, {name: '25 OZ (750 ml)', price: 949}],
    images: ['/products/Magic Ceramic Coffee Mug.avif'],
    description: 'Heat-sensitive magic mug that reveals custom artwork when hot liquid is poured.',
    specs: {material: 'Thermal Ceramic', print: 'HD Sublimation', capacity: '325ml', care: 'Hand wash recommended'}
  },
  {
    id: 'prod-colour-mug', slug: 'colour-ceramic-coffee-mug', title: 'Colour Ceramic Coffee Mug', category: 'Ceramic Mugs', niche: 'Original Sipware', type: 'Bestseller',
    price: 520, compare_at_price: 740, sold: 160, active: true, featured: false, created_at: '2026-01-07T00:00:00.000Z',
    sizes: [{name: '11 OZ (325 ml)', price: 520}, {name: '25 OZ (750 ml)', price: 920}],
    images: ['/products/Colour Ceramic Coffee Mug.avif'],
    description: 'Vibrant interior and handle colour ceramic mug with high-definition print.',
    specs: {material: 'Ceramic', print: 'HD Sublimation', capacity: '325ml / 750ml', care: 'Dishwasher & microwave safe'}
  },
  {
    id: 'prod-sipper-bottle', slug: 'aluminium-sipper-bottle', title: 'Aluminium Sipper Bottle', category: 'Bottles & Flasks', niche: 'Original Sipware', type: 'Fitness',
    price: 549, compare_at_price: 799, sold: 175, active: true, featured: true, created_at: '2026-01-08T00:00:00.000Z',
    sizes: [{name: '11 OZ (325 ml)', price: 549}, {name: '25 OZ (750 ml)', price: 949}],
    images: ['/products/Aluminium Sipper Bottle.avif'],
    description: 'Lightweight aluminium sipper bottle with carabiner hook for gym and travel.',
    specs: {material: 'Aluminium', print: 'HD Sublimation', capacity: '750ml', care: 'Hand wash recommended'}
  },
  {
    id: 'prod-steel-bottle', slug: 'stainless-steel-water-bottle', title: 'Stainless Steel Water Bottle', category: 'Bottles & Flasks', niche: 'Original Sipware', type: 'Fitness',
    price: 599, compare_at_price: 849, sold: 220, active: true, featured: true, created_at: '2026-01-09T00:00:00.000Z',
    sizes: [{name: '11 OZ (325 ml)', price: 599}, {name: '25 OZ (750 ml)', price: 999}],
    images: ['/products/Stainless Steel Water Bottle.avif'],
    description: 'Insulated stainless steel water bottle, keeping beverages hot or cold for hours.',
    specs: {material: 'Stainless Steel', print: 'HD Sublimation', capacity: '750ml', care: 'Hand wash recommended'}
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
