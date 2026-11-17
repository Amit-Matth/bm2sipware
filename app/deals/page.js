import {list} from '@/lib/db';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function DealsPage() {
  const all = await list('products', {active: {$ne: false}});
  const displayProducts = all.filter(p => p.on_sale === true);

  return (
    <div className="wrap" style={{padding: '32px 16px 64px 16px', maxWidth: 1400}}>
      <div style={{marginBottom: 32, background: 'linear-gradient(135deg, var(--blue), #16202B)', color: '#fff', padding: '36px 28px', borderRadius: 24, boxShadow: '0 12px 36px rgba(36,60,143,0.2)'}}>
        <span style={{background: 'rgba(255,255,255,0.15)', padding: '6px 14px', borderRadius: 99, fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.05em'}}>
          ⚡ Top Deals &amp; Mega Vibe Sale
        </span>
        <h1 style={{fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, margin: '12px 0 8px'}}>Exclusive Heavy Discounts</h1>
        <p style={{fontSize: '1rem', opacity: 0.9, maxWidth: 600, margin: 0, lineHeight: 1.6}}>
          Shop our handpicked collection of bestselling art mugs and sippers with special limited-time price drops. Direct 10% OFF applied automatically on all items!
        </p>
      </div>

      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24}}>
        <h2 style={{fontSize: '1.4rem', fontWeight: 800}}>Featured Sale Items ({displayProducts.length})</h2>
        <Link href="/shop" className="btn ghost" style={{padding: '8px 18px', fontSize: '0.88rem', borderRadius: 99}}>
          &larr; Back to Shop
        </Link>
      </div>

      {displayProducts.length === 0 ? (
        <div style={{textAlign: 'center', padding: '64px 20px', background: '#fff', borderRadius: 20, border: '1px solid var(--line)'}}>
          <h3 style={{fontSize: '1.2rem', fontWeight: 700, marginBottom: 8}}>No active top deals right now</h3>
          <p style={{color: 'var(--mute)', marginBottom: 20}}>Enable the &quot;Feature on Top Deals / Sale Page&quot; toggle in the Admin panel for any product to feature it here.</p>
          <Link href="/shop" className="btn">Browse All Products</Link>
        </div>
      ) : (
        <div className="grid" style={{gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 24}}>
          {displayProducts.map(p => (
            <ProductCard key={p.id || p.slug} p={p} />
          ))}
        </div>
      )}
    </div>
  );
}
