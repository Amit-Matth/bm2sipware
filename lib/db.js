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
  // JAAT Haryanvi (12 items)
  {
    id: 'jh-1', slug: 'jaat-attitude-11', title: 'Jaat Status 24x7 Mug', category: 'JAAT Haryanvi', niche: 'JAAT Haryanvi', type: 'Quotes',
    price: 499, compare_at_price: 699, sold: 142, active: true, featured: true, created_at: '2026-01-01T00:00:00.000Z',
    sizes: [{name: '11 OZ (325 ml)', price: 499}, {name: '25 OZ (750 ml)', price: 899}],
    images: ['https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=600', 'https://images.unsplash.com/photo-1577803645773-f96470509666?w=600'],
    description: 'Pure Haryanvi attitude on premium ceramic. Microwave and dishwasher safe.',
    specs: {material: 'Ceramic', print: 'HD Sublimation', capacity: '325ml / 750ml'}
  },
  {
    id: 'jh-2', slug: 'haryanvi-swag-mug', title: 'System Hang Haryanvi Mug', category: 'JAAT Haryanvi', niche: 'JAAT Haryanvi', type: 'Trending',
    price: 520, compare_at_price: 750, sold: 98, active: true, featured: true, created_at: '2026-01-02T00:00:00.000Z',
    sizes: [{name: '11 OZ (325 ml)', price: 520}, {name: '25 OZ (750 ml)', price: 920}],
    images: ['https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600'],
    description: 'Bholenath bhakt & Haryanvi pride in one bold mug.',
    specs: {material: 'Ceramic', print: 'HD Sublimation', capacity: '325ml / 750ml'}
  },
  {
    id: 'jh-3', slug: 'jaat-landlord-mug', title: 'Zimidar Jaat Landlord Mug', category: 'JAAT Haryanvi', niche: 'JAAT Haryanvi', type: 'Quotes',
    price: 499, compare_at_price: 699, sold: 85, active: true, featured: false, created_at: '2026-01-03T00:00:00.000Z',
    sizes: [{name: '11 OZ (325 ml)', price: 499}, {name: '25 OZ (750 ml)', price: 899}],
    images: ['https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=600'],
    description: 'For the roots that run deep in Haryana soil.',
    specs: {material: 'Ceramic', print: 'HD Sublimation', capacity: '325ml / 750ml'}
  },
  {
    id: 'jh-4', slug: 'jaat-gun-and-rose-mug', title: 'Desi Jaat Swag Mug', category: 'JAAT Haryanvi', niche: 'JAAT Haryanvi', type: 'Symbols',
    price: 510, compare_at_price: 720, sold: 76, active: true, featured: false, created_at: '2026-01-04T00:00:00.000Z',
    sizes: [{name: '11 OZ (325 ml)', price: 510}, {name: '25 OZ (750 ml)', price: 910}],
    images: ['https://images.unsplash.com/photo-1577803645773-f96470509666?w=600'],
    description: 'Unapologetic Haryanvi representation.',
    specs: {material: 'Ceramic', print: 'HD Sublimation', capacity: '325ml / 750ml'}
  },
  {
    id: 'jh-5', slug: 'haryanvi-jaatni-mug', title: 'Swag Wali Jaatni Mug', category: 'JAAT Haryanvi', niche: 'JAAT Haryanvi', type: 'Trending',
    price: 499, compare_at_price: 699, sold: 112, active: true, featured: true, created_at: '2026-01-05T00:00:00.000Z',
    sizes: [{name: '11 OZ (325 ml)', price: 499}, {name: '25 OZ (750 ml)', price: 899}],
    images: ['https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600'],
    description: 'Fierce and unstoppable.',
    specs: {material: 'Ceramic', print: 'HD Sublimation', capacity: '325ml / 750ml'}
  },
  {
    id: 'jh-6', slug: 'jaat-bhaichara-mug', title: 'Bhaichara Top Pe Mug', category: 'JAAT Haryanvi', niche: 'JAAT Haryanvi', type: 'Viral Reels',
    price: 499, compare_at_price: 699, sold: 134, active: true, featured: true, created_at: '2026-01-06T00:00:00.000Z',
    sizes: [{name: '11 OZ (325 ml)', price: 499}, {name: '25 OZ (750 ml)', price: 899}],
    images: ['https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=600'],
    description: 'Viral reel dialogue immortalized on a sturdy mug.',
    specs: {material: 'Ceramic', print: 'HD Sublimation', capacity: '325ml / 750ml'}
  },
  {
    id: 'jh-7', slug: 'jaat-gym-freak-mug', title: 'Jaat Workout Fuel Mug', category: 'JAAT Haryanvi', niche: 'JAAT Haryanvi', type: 'Competitors',
    price: 530, compare_at_price: 790, sold: 67, active: true, featured: false, created_at: '2026-01-07T00:00:00.000Z',
    sizes: [{name: '11 OZ (325 ml)', price: 530}, {name: '25 OZ (750 ml)', price: 950}],
    images: ['https://images.unsplash.com/photo-1577803645773-f96470509666?w=600'],
    description: 'Akhada & gym ready.',
    specs: {material: 'Ceramic', print: 'HD Sublimation', capacity: '325ml / 750ml'}
  },
  {
    id: 'jh-8', slug: 'haryanvi-route-mug', title: 'Haryana Roadways Legend Mug', category: 'JAAT Haryanvi', niche: 'JAAT Haryanvi', type: 'Viral Reels',
    price: 499, compare_at_price: 699, sold: 88, active: true, featured: false, created_at: '2026-01-08T00:00:00.000Z',
    sizes: [{name: '11 OZ (325 ml)', price: 499}, {name: '25 OZ (750 ml)', price: 899}],
    images: ['https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600'],
    description: 'Dedicated to the iconic Haryana Roadways bus drivers.',
    specs: {material: 'Ceramic', print: 'HD Sublimation', capacity: '325ml / 750ml'}
  },
  {
    id: 'jh-9', slug: 'jaat-tractor-lover-mug', title: 'Tractor King Jaat Mug', category: 'JAAT Haryanvi', niche: 'JAAT Haryanvi', type: 'Symbols',
    price: 515, compare_at_price: 740, sold: 104, active: true, featured: false, created_at: '2026-01-09T00:00:00.000Z',
    sizes: [{name: '11 OZ (325 ml)', price: 515}, {name: '25 OZ (750 ml)', price: 915}],
    images: ['https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=600'],
    description: 'Fields and power.',
    specs: {material: 'Ceramic', print: 'HD Sublimation', capacity: '325ml / 750ml'}
  },
  {
    id: 'jh-10', slug: 'jaat-hookah-water-mug', title: 'Hookah Tau Mug', category: 'JAAT Haryanvi', niche: 'JAAT Haryanvi', type: 'Trending',
    price: 499, compare_at_price: 699, sold: 91, active: true, featured: false, created_at: '2026-01-10T00:00:00.000Z',
    sizes: [{name: '11 OZ (325 ml)', price: 499}, {name: '25 OZ (750 ml)', price: 899}],
    images: ['https://images.unsplash.com/photo-1577803645773-f96470509666?w=600'],
    description: 'Tau ki chaupal vibes.',
    specs: {material: 'Ceramic', print: 'HD Sublimation', capacity: '325ml / 750ml'}
  },
  {
    id: 'jh-11', slug: 'jaat-pride-mug', title: 'Haryana Pride Crest Mug', category: 'JAAT Haryanvi', niche: 'JAAT Haryanvi', type: 'Quotes',
    price: 499, compare_at_price: 699, sold: 65, active: true, featured: false, created_at: '2026-01-11T00:00:00.000Z',
    sizes: [{name: '11 OZ (325 ml)', price: 499}, {name: '25 OZ (750 ml)', price: 899}],
    images: ['https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600'],
    description: 'Classic heritage artwork.',
    specs: {material: 'Ceramic', print: 'HD Sublimation', capacity: '325ml / 750ml'}
  },
  {
    id: 'jh-12', slug: 'jaat-desi-style-mug', title: 'Desi Jaat Style Mug', category: 'JAAT Haryanvi', niche: 'JAAT Haryanvi', type: 'Competitors',
    price: 499, compare_at_price: 699, sold: 72, active: true, featured: false, created_at: '2026-01-12T00:00:00.000Z',
    sizes: [{name: '11 OZ (325 ml)', price: 499}, {name: '25 OZ (750 ml)', price: 899}],
    images: ['https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=600'],
    description: 'Pure desi essence.',
    specs: {material: 'Ceramic', print: 'HD Sublimation', capacity: '325ml / 750ml'}
  },

  // Stock Market (12 items)
  {
    id: 'sm-1', slug: 'bull-market-mug', title: 'Bull Run 100x Mug', category: 'Stock Market', niche: 'Stock Market', type: 'Symbols',
    price: 499, compare_at_price: 699, sold: 215, active: true, featured: true, created_at: '2026-01-01T00:00:00.000Z',
    sizes: [{name: '11 OZ (325 ml)', price: 499}, {name: '25 OZ (750 ml)', price: 899}],
    images: ['https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600', 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=600'],
    description: 'For morning coffee while watching green candles.',
    specs: {material: 'Ceramic', print: 'HD Sublimation', capacity: '325ml / 750ml'}
  },
  {
    id: 'sm-2', slug: 'loss-porn-recovery-mug', title: 'Recovering F&O Losses Mug', category: 'Stock Market', niche: 'Stock Market', type: 'Viral Reels',
    price: 520, compare_at_price: 750, sold: 189, active: true, featured: true, created_at: '2026-01-02T00:00:00.000Z',
    sizes: [{name: '11 OZ (325 ml)', price: 520}, {name: '25 OZ (750 ml)', price: 920}],
    images: ['https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=600'],
    description: 'Index options trader survival kit.',
    specs: {material: 'Ceramic', print: 'HD Sublimation', capacity: '325ml / 750ml'}
  },
  {
    id: 'sm-3', slug: 'buy-high-sell-low-mug', title: 'Buy High Sell Low Pro Mug', category: 'Stock Market', niche: 'Stock Market', type: 'Quotes',
    price: 499, compare_at_price: 699, sold: 145, active: true, featured: false, created_at: '2026-01-03T00:00:00.000Z',
    sizes: [{name: '11 OZ (325 ml)', price: 499}, {name: '25 OZ (750 ml)', price: 899}],
    images: ['https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600'],
    description: 'The ultimate retail trader mantra.',
    specs: {material: 'Ceramic', print: 'HD Sublimation', capacity: '325ml / 750ml'}
  },
  {
    id: 'sm-4', slug: 'candlestick-chart-mug', title: 'Bullish Engulfing Mug', category: 'Stock Market', niche: 'Stock Market', type: 'Symbols',
    price: 510, compare_at_price: 720, sold: 110, active: true, featured: false, created_at: '2026-01-04T00:00:00.000Z',
    sizes: [{name: '11 OZ (325 ml)', price: 510}, {name: '25 OZ (750 ml)', price: 910}],
    images: ['https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=600'],
    description: 'Technical analysis printed on ceramic.',
    specs: {material: 'Ceramic', print: 'HD Sublimation', capacity: '325ml / 750ml'}
  },
  {
    id: 'sm-5', slug: 'dividend-king-mug', title: 'Long Term Investor Mug', category: 'Stock Market', niche: 'Stock Market', type: 'Quotes',
    price: 499, compare_at_price: 699, sold: 95, active: true, featured: false, created_at: '2026-01-05T00:00:00.000Z',
    sizes: [{name: '11 OZ (325 ml)', price: 499}, {name: '25 OZ (750 ml)', price: 899}],
    images: ['https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600'],
    description: 'Compound interest is the 8th wonder.',
    specs: {material: 'Ceramic', print: 'HD Sublimation', capacity: '325ml / 750ml'}
  },
  {
    id: 'sm-6', slug: 'circuit-limit-hit-mug', title: 'Upper Circuit Hit Mug', category: 'Stock Market', niche: 'Stock Market', type: 'Trending',
    price: 499, compare_at_price: 699, sold: 130, active: true, featured: true, created_at: '2026-01-06T00:00:00.000Z',
    sizes: [{name: '11 OZ (325 ml)', price: 499}, {name: '25 OZ (750 ml)', price: 899}],
    images: ['https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=600'],
    description: 'Pure joy when your small cap hits 20% upper circuit.',
    specs: {material: 'Ceramic', print: 'HD Sublimation', capacity: '325ml / 750ml'}
  },
  {
    id: 'sm-7', slug: 'sebi-warning-mug', title: 'SEBI Disclaimer Mug', category: 'Stock Market', niche: 'Stock Market', type: 'Viral Reels',
    price: 530, compare_at_price: 790, sold: 167, active: true, featured: false, created_at: '2026-01-07T00:00:00.000Z',
    sizes: [{name: '11 OZ (325 ml)', price: 530}, {name: '25 OZ (750 ml)', price: 950}],
    images: ['https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600'],
    description: 'Subject to market risk disclaimer right on your coffee cup.',
    specs: {material: 'Ceramic', print: 'HD Sublimation', capacity: '325ml / 750ml'}
  },
  {
    id: 'sm-8', slug: 'papa-ke-pise-fo-mug', title: 'Expiry Day Trader Mug', category: 'Stock Market', niche: 'Stock Market', type: 'Competitors',
    price: 499, compare_at_price: 699, sold: 88, active: true, featured: false, created_at: '2026-01-08T00:00:00.000Z',
    sizes: [{name: '11 OZ (325 ml)', price: 499}, {name: '25 OZ (750 ml)', price: 899}],
    images: ['https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=600'],
    description: 'Thursday 3:15 PM heart attacks.',
    specs: {material: 'Ceramic', print: 'HD Sublimation', capacity: '325ml / 750ml'}
  },
  {
    id: 'sm-9', slug: 'multibagger-hunt-mug', title: 'Multibagger Hunter Mug', category: 'Stock Market', niche: 'Stock Market', type: 'Quotes',
    price: 515, compare_at_price: 740, sold: 94, active: true, featured: false, created_at: '2026-01-09T00:00:00.000Z',
    sizes: [{name: '11 OZ (325 ml)', price: 515}, {name: '25 OZ (750 ml)', price: 915}],
    images: ['https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600'],
    description: 'Finding the next 10x stock.',
    specs: {material: 'Ceramic', print: 'HD Sublimation', capacity: '325ml / 750ml'}
  },
  {
    id: 'sm-10', slug: 'bear-trap-mug', title: 'Bear Trap Survivor Mug', category: 'Stock Market', niche: 'Stock Market', type: 'Symbols',
    price: 499, compare_at_price: 699, sold: 71, active: true, featured: false, created_at: '2026-01-10T00:00:00.000Z',
    sizes: [{name: '11 OZ (325 ml)', price: 499}, {name: '25 OZ (750 ml)', price: 899}],
    images: ['https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=600'],
    description: 'Surviving market corrections like a pro.',
    specs: {material: 'Ceramic', print: 'HD Sublimation', capacity: '325ml / 750ml'}
  },
  {
    id: 'sm-11', slug: 'sip-every-month-mug', title: 'SIP Daily Reminder Mug', category: 'Stock Market', niche: 'Stock Market', type: 'Quotes',
    price: 499, compare_at_price: 699, sold: 105, active: true, featured: false, created_at: '2026-01-11T00:00:00.000Z',
    sizes: [{name: '11 OZ (325 ml)', price: 499}, {name: '25 OZ (750 ml)', price: 899}],
    images: ['https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600'],
    description: 'Systematic Investment Plan discipline.',
    specs: {material: 'Ceramic', print: 'HD Sublimation', capacity: '325ml / 750ml'}
  },
  {
    id: 'sm-12', slug: 'stock-market-guru-mug', title: 'Self Proclaimed Guru Mug', category: 'Stock Market', niche: 'Stock Market', type: 'Competitors',
    price: 499, compare_at_price: 699, sold: 62, active: true, featured: false, created_at: '2026-01-12T00:00:00.000Z',
    sizes: [{name: '11 OZ (325 ml)', price: 499}, {name: '25 OZ (750 ml)', price: 899}],
    images: ['https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=600'],
    description: 'Every telegram channel admin ever.',
    specs: {material: 'Ceramic', print: 'HD Sublimation', capacity: '325ml / 750ml'}
  },

  // Relationships (13 items)
  {
    id: 'rel-1', slug: 'coffee-and-you-mug', title: 'You Are My Favorite Coffee Mug', category: 'Relationships', niche: 'Relationships', type: 'Quotes',
    price: 499, compare_at_price: 699, sold: 240, active: true, featured: true, created_at: '2026-01-01T00:00:00.000Z',
    sizes: [{name: '11 OZ (325 ml)', price: 499}, {name: '25 OZ (750 ml)', price: 899}],
    images: ['https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600', 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600'],
    description: 'Perfect couple mug for shared mornings.',
    specs: {material: 'Ceramic', print: 'HD Sublimation', capacity: '325ml / 750ml'}
  },
  {
    id: 'rel-2', slug: 'ldr-long-distance-mug', title: 'Miles Apart Same Coffee Mug', category: 'Relationships', niche: 'Relationships', type: 'Trending',
    price: 520, compare_at_price: 750, sold: 175, active: true, featured: true, created_at: '2026-01-02T00:00:00.000Z',
    sizes: [{name: '11 OZ (325 ml)', price: 520}, {name: '25 OZ (750 ml)', price: 920}],
    images: ['https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600'],
    description: 'Bridge the distance with matching mugs.',
    specs: {material: 'Ceramic', print: 'HD Sublimation', capacity: '325ml / 750ml'}
  },
  {
    id: 'rel-3', slug: 'bae-ownership-mug', title: 'Property of My Wife Mug', category: 'Relationships', niche: 'Relationships', type: 'Viral Reels',
    price: 499, compare_at_price: 699, sold: 132, active: true, featured: false, created_at: '2026-01-03T00:00:00.000Z',
    sizes: [{name: '11 OZ (325 ml)', price: 499}, {name: '25 OZ (750 ml)', price: 899}],
    images: ['https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600'],
    description: 'Humorous relationship milestone mug.',
    specs: {material: 'Ceramic', print: 'HD Sublimation', capacity: '325ml / 750ml'}
  },
  {
    id: 'rel-4', slug: 'soulmate-matching-mug', title: 'Better Together Couple Mug', category: 'Relationships', niche: 'Relationships', type: 'Symbols',
    price: 510, compare_at_price: 720, sold: 119, active: true, featured: false, created_at: '2026-01-04T00:00:00.000Z',
    sizes: [{name: '11 OZ (325 ml)', price: 510}, {name: '25 OZ (750 ml)', price: 910}],
    images: ['https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600'],
    description: 'Minimalist hearts design.',
    specs: {material: 'Ceramic', print: 'HD Sublimation', capacity: '325ml / 750ml'}
  },
  {
    id: 'rel-5', slug: 'husband-wife-arguments-mug', title: 'She Is Always Right Mug', category: 'Relationships', niche: 'Relationships', type: 'Quotes',
    price: 499, compare_at_price: 699, sold: 160, active: true, featured: false, created_at: '2026-01-05T00:00:00.000Z',
    sizes: [{name: '11 OZ (325 ml)', price: 499}, {name: '25 OZ (750 ml)', price: 899}],
    images: ['https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600'],
    description: 'The golden rule of a happy marriage.',
    specs: {material: 'Ceramic', print: 'HD Sublimation', capacity: '325ml / 750ml'}
  },
  {
    id: 'rel-6', slug: 'valentines-special-mug', title: 'Infinite Love Mug', category: 'Relationships', niche: 'Relationships', type: 'Trending',
    price: 499, compare_at_price: 699, sold: 188, active: true, featured: true, created_at: '2026-01-06T00:00:00.000Z',
    sizes: [{name: '11 OZ (325 ml)', price: 499}, {name: '25 OZ (750 ml)', price: 899}],
    images: ['https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600'],
    description: 'Gifting favorite for anniversaries and birthdays.',
    specs: {material: 'Ceramic', print: 'HD Sublimation', capacity: '325ml / 750ml'}
  },
  {
    id: 'rel-7', slug: 'best-girlfriend-ever-mug', title: 'World Best Girlfriend Mug', category: 'Relationships', niche: 'Relationships', type: 'Competitors',
    price: 499, compare_at_price: 699, sold: 94, active: true, featured: false, created_at: '2026-01-07T00:00:00.000Z',
    sizes: [{name: '11 OZ (325 ml)', price: 499}, {name: '25 OZ (750 ml)', price: 899}],
    images: ['https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600'],
    description: 'Thoughtful gift for your special someone.',
    specs: {material: 'Ceramic', print: 'HD Sublimation', capacity: '325ml / 750ml'}
  },
  {
    id: 'rel-8', slug: 'best-boyfriend-ever-mug', title: 'World Best Boyfriend Mug', category: 'Relationships', niche: 'Relationships', type: 'Competitors',
    price: 499, compare_at_price: 699, sold: 87, active: true, featured: false, created_at: '2026-01-08T00:00:00.000Z',
    sizes: [{name: '11 OZ (325 ml)', price: 499}, {name: '25 OZ (750 ml)', price: 899}],
    images: ['https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600'],
    description: 'Sturdy ceramic for everyday coffee.',
    specs: {material: 'Ceramic', print: 'HD Sublimation', capacity: '325ml / 750ml'}
  },
  {
    id: 'rel-9', slug: 'soul-connection-mug', title: 'Soul Connection Mug', category: 'Relationships', niche: 'Relationships', type: 'Quotes',
    price: 515, compare_at_price: 740, sold: 76, active: true, featured: false, created_at: '2026-01-09T00:00:00.000Z',
    sizes: [{name: '11 OZ (325 ml)', price: 515}, {name: '25 OZ (750 ml)', price: 915}],
    images: ['https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600'],
    description: 'Deep heartfelt message.',
    specs: {material: 'Ceramic', print: 'HD Sublimation', capacity: '325ml / 750ml'}
  },
  {
    id: 'rel-10', slug: 'engaged-couple-mug', title: 'Soon To Be Married Mug', category: 'Relationships', niche: 'Relationships', type: 'Symbols',
    price: 499, compare_at_price: 699, sold: 64, active: true, featured: false, created_at: '2026-01-10T00:00:00.000Z',
    sizes: [{name: '11 OZ (325 ml)', price: 499}, {name: '25 OZ (750 ml)', price: 899}],
    images: ['https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600'],
    description: 'Engagement gift special.',
    specs: {material: 'Ceramic', print: 'HD Sublimation', capacity: '325ml / 750ml'}
  },
  {
    id: 'rel-11', slug: 'first-date-memory-mug', title: 'Where We Met Mug', category: 'Relationships', niche: 'Relationships', type: 'Viral Reels',
    price: 530, compare_at_price: 790, sold: 58, active: true, featured: false, created_at: '2026-01-11T00:00:00.000Z',
    sizes: [{name: '11 OZ (325 ml)', price: 530}, {name: '25 OZ (750 ml)', price: 950}],
    images: ['https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600'],
    description: 'Customizable memory map design.',
    specs: {material: 'Ceramic', print: 'HD Sublimation', capacity: '325ml / 750ml'}
  },
  {
    id: 'rel-12', slug: 'anniversary-milestone-mug', title: 'Happy Anniversary Mug', category: 'Relationships', niche: 'Relationships', type: 'Quotes',
    price: 499, compare_at_price: 699, sold: 110, active: true, featured: false, created_at: '2026-01-12T00:00:00.000Z',
    sizes: [{name: '11 OZ (325 ml)', price: 499}, {name: '25 OZ (750 ml)', price: 899}],
    images: ['https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600'],
    description: 'Celebrating years of togetherness.',
    specs: {material: 'Ceramic', print: 'HD Sublimation', capacity: '325ml / 750ml'}
  },
  {
    id: 'rel-13', slug: 'forever-mine-mug', title: 'Forever Mine Mug', category: 'Relationships', niche: 'Relationships', type: 'Trending',
    price: 499, compare_at_price: 699, sold: 83, active: true, featured: false, created_at: '2026-01-13T00:00:00.000Z',
    sizes: [{name: '11 OZ (325 ml)', price: 499}, {name: '25 OZ (750 ml)', price: 899}],
    images: ['https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600'],
    description: 'Classic romantic keepsake.',
    specs: {material: 'Ceramic', print: 'HD Sublimation', capacity: '325ml / 750ml'}
  },

  // Corporate Engineers (13 items)
  {
    id: 'ce-1', slug: 'it-guy-coffee-mug', title: 'Eat Sleep Code Repeat Mug', category: 'Corporate Engineers', niche: 'Corporate Engineers', type: 'Quotes',
    price: 499, compare_at_price: 699, sold: 310, active: true, featured: true, created_at: '2026-01-01T00:00:00.000Z',
    sizes: [{name: '11 OZ (325 ml)', price: 499}, {name: '25 OZ (750 ml)', price: 899}],
    images: ['https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600', 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600'],
    description: 'Essential fuel for software developers and debugging marathons.',
    specs: {material: 'Ceramic', print: 'HD Sublimation', capacity: '325ml / 750ml'}
  },
  {
    id: 'ce-2', slug: 'prod-deployment-friday-mug', title: 'Never Deploy On Friday Mug', category: 'Corporate Engineers', niche: 'Corporate Engineers', type: 'Trending',
    price: 520, compare_at_price: 750, sold: 245, active: true, featured: true, created_at: '2026-01-02T00:00:00.000Z',
    sizes: [{name: '11 OZ (325 ml)', price: 520}, {name: '25 OZ (750 ml)', price: 920}],
    images: ['https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600'],
    description: 'The cardinal rule of every tech team.',
    specs: {material: 'Ceramic', print: 'HD Sublimation', capacity: '325ml / 750ml'}
  },
  {
    id: 'ce-3', slug: 'it-works-on-my-machine-mug', title: 'It Works On My Machine Mug', category: 'Corporate Engineers', niche: 'Corporate Engineers', type: 'Viral Reels',
    price: 499, compare_at_price: 699, sold: 198, active: true, featured: false, created_at: '2026-01-03T00:00:00.000Z',
    sizes: [{name: '11 OZ (325 ml)', price: 499}, {name: '25 OZ (750 ml)', price: 899}],
    images: ['https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600'],
    description: 'Famous last words before a production outage.',
    specs: {material: 'Ceramic', print: 'HD Sublimation', capacity: '325ml / 750ml'}
  },
  {
    id: 'ce-4', slug: 'stack-overflow-mug', title: 'Copy Paste From StackOverflow Mug', category: 'Corporate Engineers', niche: 'Corporate Engineers', type: 'Viral Reels',
    price: 499, compare_at_price: 699, sold: 215, active: true, featured: true, created_at: '2026-01-04T00:00:00.000Z',
    sizes: [{name: '11 OZ (325 ml)', price: 499}, {name: '25 OZ (750 ml)', price: 899}],
    images: ['https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600'],
    description: 'How software is actually built.',
    specs: {material: 'Ceramic', print: 'HD Sublimation', capacity: '325ml / 750ml'}
  },
  {
    id: 'ce-5', slug: 'jira-ticket-hell-mug', title: 'Another Jira Ticket Mug', category: 'Corporate Engineers', niche: 'Corporate Engineers', type: 'Quotes',
    price: 510, compare_at_price: 720, sold: 167, active: true, featured: false, created_at: '2026-01-05T00:00:00.000Z',
    sizes: [{name: '11 OZ (325 ml)', price: 510}, {name: '25 OZ (750 ml)', price: 910}],
    images: ['https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600'],
    description: 'Sprint planning survival mug.',
    specs: {material: 'Ceramic', print: 'HD Sublimation', capacity: '325ml / 750ml'}
  },
  {
    id: 'ce-6', slug: 'corporate-as-per-my-email-mug', title: 'As Per My Last Email Mug', category: 'Corporate Engineers', niche: 'Corporate Engineers', type: 'Trending',
    price: 499, compare_at_price: 699, sold: 230, active: true, featured: true, created_at: '2026-01-06T00:00:00.000Z',
    sizes: [{name: '11 OZ (325 ml)', price: 499}, {name: '25 OZ (750 ml)', price: 899}],
    images: ['https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600'],
    description: 'Passive aggressive corporate communication at its finest.',
    specs: {material: 'Ceramic', print: 'HD Sublimation', capacity: '325ml / 750ml'}
  },
  {
    id: 'ce-7', slug: 'wfh-pajama-coder-mug', title: 'WFH Camera Off Mug', category: 'Corporate Engineers', niche: 'Corporate Engineers', type: 'Symbols',
    price: 499, compare_at_price: 699, sold: 154, active: true, featured: false, created_at: '2026-01-07T00:00:00.000Z',
    sizes: [{name: '11 OZ (325 ml)', price: 499}, {name: '25 OZ (750 ml)', price: 899}],
    images: ['https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600'],
    description: 'For endless Zoom and Teams meetings.',
    specs: {material: 'Ceramic', print: 'HD Sublimation', capacity: '325ml / 750ml'}
  },
  {
    id: 'ce-8', slug: 'debugging-rubber-duck-mug', title: 'Rubber Duck Debugging Mug', category: 'Corporate Engineers', niche: 'Corporate Engineers', type: 'Symbols',
    price: 515, compare_at_price: 740, sold: 112, active: true, featured: false, created_at: '2026-01-08T00:00:00.000Z',
    sizes: [{name: '11 OZ (325 ml)', price: 515}, {name: '25 OZ (750 ml)', price: 915}],
    images: ['https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600'],
    description: 'Talk to the duck, sip the coffee.',
    specs: {material: 'Ceramic', print: 'HD Sublimation', capacity: '325ml / 750ml'}
  },
  {
    id: 'ce-9', slug: 'coffee-to-code-converter-mug', title: 'Coffee To Code Converter Mug', category: 'Corporate Engineers', niche: 'Corporate Engineers', type: 'Quotes',
    price: 499, compare_at_price: 699, sold: 180, active: true, featured: false, created_at: '2026-01-09T00:00:00.000Z',
    sizes: [{name: '11 OZ (325 ml)', price: 499}, {name: '25 OZ (750 ml)', price: 899}],
    images: ['https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600'],
    description: 'Literally turns caffeine into pull requests.',
    specs: {material: 'Ceramic', print: 'HD Sublimation', capacity: '325ml / 750ml'}
  },
  {
    id: 'ce-10', slug: 'legacy-code-survivor-mug', title: 'Legacy Code Survivor Mug', category: 'Corporate Engineers', niche: 'Corporate Engineers', type: 'Competitors',
    price: 530, compare_at_price: 790, sold: 98, active: true, featured: false, created_at: '2026-01-10T00:00:00.000Z',
    sizes: [{name: '11 OZ (325 ml)', price: 530}, {name: '25 OZ (750 ml)', price: 950}],
    images: ['https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600'],
    description: 'Touching 10-year old undocumented spaghetti code without crying.',
    specs: {material: 'Ceramic', print: 'HD Sublimation', capacity: '325ml / 750ml'}
  },
  {
    id: 'ce-11', slug: 'git-push-origin-main-mug', title: 'Git Push Force Main Mug', category: 'Corporate Engineers', niche: 'Corporate Engineers', type: 'Trending',
    price: 499, compare_at_price: 699, sold: 140, active: true, featured: false, created_at: '2026-01-11T00:00:00.000Z',
    sizes: [{name: '11 OZ (325 ml)', price: 499}, {name: '25 OZ (750 ml)', price: 899}],
    images: ['https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600'],
    description: 'Living life on the edge of master branch.',
    specs: {material: 'Ceramic', print: 'HD Sublimation', capacity: '325ml / 750ml'}
  },
  {
    id: 'ce-12', slug: 'meeting-could-have-been-email-mug', title: 'This Meeting Was Email Mug', category: 'Corporate Engineers', niche: 'Corporate Engineers', type: 'Quotes',
    price: 499, compare_at_price: 699, sold: 210, active: true, featured: false, created_at: '2026-01-12T00:00:00.000Z',
    sizes: [{name: '11 OZ (325 ml)', price: 499}, {name: '25 OZ (750 ml)', price: 899}],
    images: ['https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600'],
    description: 'Express your true feelings during 9 AM sync.',
    specs: {material: 'Ceramic', print: 'HD Sublimation', capacity: '325ml / 750ml'}
  },
  {
    id: 'ce-13', slug: 'senior-software-architect-mug', title: 'Senior Architect Mug', category: 'Corporate Engineers', niche: 'Corporate Engineers', type: 'Competitors',
    price: 549, compare_at_price: 799, sold: 77, active: true, featured: false, created_at: '2026-01-13T00:00:00.000Z',
    sizes: [{name: '11 OZ (325 ml)', price: 549}, {name: '25 OZ (750 ml)', price: 999}],
    images: ['https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600'],
    description: 'Diagrams, reviews, and coffee.',
    specs: {material: 'Ceramic', print: 'HD Sublimation', capacity: '325ml / 750ml'}
  }
];

export const list=async(n,q={},sort={created_at:-1},limit=0)=>{
  try {
    const c = await col(n);
    let items = await c.find(q,P).sort(sort).limit(limit).toArray();
    if (n === 'products' && items.length === 0) {
      try {
        for (const mp of MOCK_PRODUCTS) {
          await c.updateOne({ id: mp.id }, { $set: { ...mp, qikink_sku: mp.qikink_sku || 'coding_1' } }, { upsert: true });
        }
        items = await c.find(q,P).sort(sort).limit(limit).toArray();
      } catch (seedErr) {
        console.warn('Auto-seed products failed:', seedErr.message);
        items = [...MOCK_PRODUCTS];
      }
    }
    return items;
  } catch (e) {
    console.warn(`list error for ${n}:`, e.message);
    if (n === 'products') {
      let res = [...MOCK_PRODUCTS];
      if (q.category) res = res.filter(p => p.category === q.category);
      if (q.niche) res = res.filter(p => p.niche === q.niche);
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
