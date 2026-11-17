import {one, list} from '@/lib/db';
import {notFound} from 'next/navigation';
import Link from 'next/link';
import Buy from './Buy';
import ProductCard from '@/components/ProductCard';

export const dynamic = 'force-dynamic';

export default async function Product({params}) {
  const p = await one('products', {slug: params.slug, active: {$ne: false}});
  if (!p) notFound();

  const allProducts = await list('products', {active: {$ne: false}});

  // Section: "Same Design on Other Products" - Products with matching design or different product types
  const sameDesignProducts = allProducts.filter(item => {
    if (item.id === p.id) return false;
    if (p.design_url && item.design_url === p.design_url) return true;
    if (p.qikink_sku && item.qikink_sku === p.qikink_sku) return true;
    if (p.slug && item.slug && item.slug.split('-')[0] === p.slug.split('-')[0]) return true;
    return false;
  });
  const fallbacksSameDesign = allProducts.filter(item => item.id !== p.id && item.product_type !== p.product_type && !sameDesignProducts.some(s => s.id === item.id));
  const combinedSameDesign = [...sameDesignProducts, ...fallbacksSameDesign];
  const sameDesignItems = combinedSameDesign.slice(0, 4);

  // Section: "You May Also Like" - Related products in same niche or category
  const youMayLike = allProducts.filter(item => item.id !== p.id && (item.niche === p.niche || item.category === p.category));
  const fallbacksYouMayLike = allProducts.filter(item => item.id !== p.id && !youMayLike.some(y => y.id === item.id));
  const combinedYouMayLike = [...youMayLike, ...fallbacksYouMayLike];
  const youMayLikeItems = combinedYouMayLike.slice(0, 4);

  return (
    <div className="wrap">
      <Buy p={p}/>

      {/* First Section: Same Design on Other Products */}
      {sameDesignItems.length > 0 && (
        <section style={{paddingTop: 48, paddingBottom: 36}}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, gap: 16, flexWrap: 'wrap'}}>
            <div>
              <h2 style={{fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)', fontWeight: 800, margin: '0 0 4px'}}>Same Design on Other Products</h2>
              <p style={{color: 'var(--mute)', fontSize: '0.9rem', margin: 0}}>Get this artwork printed on mugs, enamel cups, or water bottles</p>
            </div>
            {combinedSameDesign.length > 4 && (
              <Link href="/shop" className="btn ghost" style={{padding: '8px 20px', fontSize: '0.88rem', borderRadius: 99}}>
                View All &rarr;
              </Link>
            )}
          </div>
          <div className="grid">
            {sameDesignItems.map(r => (
              <ProductCard key={r.id || r.slug} p={r}/>
            ))}
          </div>
        </section>
      )}

      {/* Second Section: You May Also Like */}
      {youMayLikeItems.length > 0 && (
        <section style={{paddingTop: 24, paddingBottom: 64, borderTop: '1px solid var(--line)'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, gap: 16, flexWrap: 'wrap'}}>
            <div>
              <h2 style={{fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)', fontWeight: 800, margin: 0}}>You May Also Like</h2>
            </div>
            {combinedYouMayLike.length > 4 && (
              <Link href={`/shop?niche=${encodeURIComponent(p.niche || '')}`} className="btn ghost" style={{padding: '8px 20px', fontSize: '0.88rem', borderRadius: 99}}>
                View All &rarr;
              </Link>
            )}
          </div>
          <div className="grid">
            {youMayLikeItems.map(r => (
              <ProductCard key={r.id || r.slug} p={r}/>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
