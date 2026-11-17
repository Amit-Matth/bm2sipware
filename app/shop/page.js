'use client';

import {useEffect, useMemo, useState} from 'react';
import ProductCard, {Img} from '@/components/ProductCard';
import {inr} from '@/lib/format';
import {useCart} from '@/components/CartProvider';
import Link from 'next/link';

export default function Shop() {
  const [all, setAll] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedNiches, setSelectedNiches] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [sort, setSort] = useState('pop');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [banner, setBanner] = useState({
    title: 'Mega Vibe Sale — Flat 10% OFF',
    subtitle: 'Direct 10% OFF applied automatically on all products!'
  });
  const {add} = useCart();

  useEffect(() => {
    try {
      const saved = localStorage.getItem('saleBannerSettings');
      if (saved) setBanner(JSON.parse(saved));
    } catch {}

    fetch('/api/products')
      .then(r => r.json())
      .then(data => {
        setAll(data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));

    const params = new URLSearchParams(location.search);
    if (params.get('cat')) setSelectedNiches([params.get('cat')]);
    if (params.get('niche')) setSelectedNiches([params.get('niche')]);
  }, []);

  const niches = [
    { label: 'Roots', value: 'Roots' },
    { label: 'Wealth', value: 'Wealth' },
    { label: 'Relationships', value: 'Relationships' },
    { label: 'Technology', value: 'Technology' }
  ];

  const productTypes = [
    { label: 'White Ceramic Mug', value: 'White Ceramic Coffee Mug' },
    { label: 'Black Ceramic Mug', value: 'Black Ceramic Coffee Mug' },
    { label: 'White Enamel Mug', value: 'White Enamel Mug' },
    { label: 'Magic Mug', value: 'Magic Ceramic Coffee Mug' },
    { label: 'Colour Mug', value: 'Colour Ceramic Coffee Mug' },
    { label: 'Aluminium Sipper Bottle', value: 'Aluminium Sipper Bottle' },
    { label: 'Steel Bottle', value: 'Stainless Steel Water Bottle' }
  ];

  const sortOptions = [
    { label: 'Most Popular', value: 'pop' },
    { label: 'Price: Low to High', value: 'low' },
    { label: 'Price: High to Low', value: 'high' },
    { label: 'Newest First', value: 'new' }
  ];

  const toggleNiche = (val) => {
    setSelectedNiches(prev =>
      prev.includes(val) ? prev.filter(v => v !== val) : [...prev, val]
    );
  };

  const toggleType = (val) => {
    setSelectedTypes(prev =>
      prev.includes(val) ? prev.filter(v => v !== val) : [...prev, val]
    );
  };

  const list = useMemo(() => {
    let l = all.filter(p => {
      if (!p) return false;
      if (selectedNiches.length > 0 && !selectedNiches.includes(p.niche) && !selectedNiches.includes(p.category)) return false;
      if (selectedTypes.length > 0) {
        const title = (p.name || p.title || '').toLowerCase();
        const category = (p.category || '').toLowerCase();
        const matchesType = selectedTypes.some(t =>
          title.includes(t.toLowerCase()) || category.includes(t.toLowerCase())
        );
        if (!matchesType) return false;
      }
      return true;
    });
    const s = {
      pop: (a, b) => (b.sold || 0) - (a.sold || 0),
      low: (a, b) => (a.price || 0) - (b.price || 0),
      high: (a, b) => (b.price || 0) - (a.price || 0),
      new: (a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0)
    }[sort];
    return [...l].sort(s);
  }, [all, selectedNiches, selectedTypes, sort]);

  const clearFilters = () => {
    setSelectedNiches([]);
    setSelectedTypes([]);
    setSort('pop');
  };

  return (
    <div className="wrap shop-container" style={{padding: '32px 16px 64px 16px', maxWidth: 1400}}>

      {/* Header Row: Title on Left, Promo Banner in Middle, View Controls on Right */}
      <div className="shop-header-row" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28, flexWrap: 'wrap', gap: 16}}>
        <div>
          <h1 style={{fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', fontWeight: 800, letterSpacing: '-.02em', marginBottom: 4}}>
            Find Your Vibe.
          </h1>
          <p style={{color: 'var(--mute)', fontSize: '0.9rem', margin: 0}}>
            Discover original art drinkware made to match your mood
          </p>
        </div>

        {/* Promo Banner Section: Info Badge + Heavy Discount Products Button */}
        <div style={{display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', justifyContent: 'center'}}>
          {/* Sale Info Badge */}
          <div
            style={{
              background: 'linear-gradient(135deg, var(--blue), #16202B)',
              color: '#fff',
              padding: '10px 18px',
              borderRadius: 99,
              fontSize: '0.85rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              boxShadow: '0 4px 16px rgba(36,60,143,0.15)'
            }}
          >
            <span>⚡</span>
            <span>{banner.title} &bull; <span style={{opacity: 0.9, fontWeight: 500}}>Direct 10% OFF</span></span>
          </div>

          {/* Heavy Discount Products CTA Button */}
          <Link
            href="/deals"
            style={{
              background: 'var(--blue)',
              color: '#fff',
              padding: '10px 20px',
              borderRadius: 99,
              fontSize: '0.85rem',
              fontWeight: 800,
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              boxShadow: '0 4px 16px rgba(36, 60, 143, 0.35)',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(36, 60, 143, 0.5)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(36, 60, 143, 0.35)';
            }}
          >
            🔥 Heavy Discount Products &rarr;
          </Link>
        </div>

        {/* Right Controls: View Switcher & Mobile Filter Button */}
        <div className="shop-controls-bar" style={{display: 'flex', alignItems: 'center', gap: 10}}>
          <div style={{display: 'flex', background: '#fff', border: '1px solid var(--line)', borderRadius: 12, padding: 3, overflow: 'hidden'}}>
            <button
              onClick={() => setViewMode('grid')}
              style={{
                padding: '8px 14px',
                background: viewMode === 'grid' ? 'var(--blue)' : 'transparent',
                color: viewMode === 'grid' ? '#fff' : 'var(--ink)',
                border: 0,
                borderRadius: 9,
                cursor: 'pointer',
                fontWeight: 700,
                fontSize: '0.88rem',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: 6
              }}
              title="Grid View"
            >
              ⊞ Grid
            </button>
            <button
              onClick={() => setViewMode('list')}
              style={{
                padding: '8px 14px',
                background: viewMode === 'list' ? 'var(--blue)' : 'transparent',
                color: viewMode === 'list' ? '#fff' : 'var(--ink)',
                border: 0,
                borderRadius: 9,
                cursor: 'pointer',
                fontWeight: 700,
                fontSize: '0.88rem',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: 6
              }}
              title="List View"
            >
              ☰ List
            </button>
          </div>

          <button
            className="mob-filter-btn btn ghost"
            onClick={() => setMobileDrawerOpen(true)}
            style={{display: 'none', padding: '9px 16px', fontSize: '0.88rem', borderRadius: 12}}
          >
            Filters ☰
          </button>
        </div>
      </div>

      {/* Mobile Backdrop Overlay for Filter Drawer */}
      {mobileDrawerOpen && (
        <div
          onClick={() => setMobileDrawerOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.45)',
            backdropFilter: 'blur(4px)',
            zIndex: 95
          }}
        />
      )}

      <div className="shop-layout" style={{display: 'grid', gridTemplateColumns: '260px 1fr', gap: 28, alignItems: 'start'}}>

        {/* Left Sticky Filter Sidebar */}
        <aside className={`filter-sidebar ${mobileDrawerOpen ? 'open' : ''}`} style={{position: 'sticky', top: 96, background: '#fff', padding: 20, borderRadius: 'var(--r)', border: '1px solid var(--line)'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20}}>
            <h3 style={{fontSize: '1.05rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.05em'}}>FILTER PRODUCTS</h3>
            {mobileDrawerOpen && (
              <button className="link" onClick={() => setMobileDrawerOpen(false)} style={{fontSize: '1.2rem', fontWeight: 700}}>✕</button>
            )}
          </div>

          {/* Explore Niche */}
          <div style={{marginBottom: 20, paddingBottom: 16, borderBottom: '1px solid var(--line)'}}>
            <h4 style={{fontSize: '0.9rem', fontWeight: 700, marginBottom: 10, color: 'var(--ink)'}}>Explore Niche</h4>
            <div style={{display: 'grid', gap: 8}}>
              {niches.map(n => {
                const checked = selectedNiches.includes(n.value);
                return (
                  <div
                    key={n.value}
                    onClick={() => toggleNiche(n.value)}
                    style={{display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', fontSize: '0.88rem', color: checked ? 'var(--blue)' : 'var(--ink)', fontWeight: checked ? 700 : 400, userSelect: 'none'}}
                  >
                    <span style={{width: 22, height: 22, borderRadius: 6, border: '1.5px solid var(--line)', background: checked ? 'var(--blue)' : '#fff', color: checked ? '#fff' : 'var(--mute)', display: 'grid', placeItems: 'center', fontSize: '0.9rem', fontWeight: 700, transition: 'all .2s', flexShrink: 0}}>
                      {checked ? '✓' : '+'}
                    </span>
                    <span>{n.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Product Type */}
          <div style={{marginBottom: 20, paddingBottom: 16, borderBottom: '1px solid var(--line)'}}>
            <h4 style={{fontSize: '0.9rem', fontWeight: 700, marginBottom: 10, color: 'var(--ink)'}}>Product Type</h4>
            <div style={{display: 'grid', gap: 8}}>
              {productTypes.map(t => {
                const checked = selectedTypes.includes(t.value);
                return (
                  <div
                    key={t.value}
                    onClick={() => toggleType(t.value)}
                    style={{display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', fontSize: '0.88rem', color: checked ? 'var(--blue)' : 'var(--ink)', fontWeight: checked ? 700 : 400, userSelect: 'none'}}
                  >
                    <span style={{width: 22, height: 22, borderRadius: 6, border: '1.5px solid var(--line)', background: checked ? 'var(--blue)' : '#fff', color: checked ? '#fff' : 'var(--mute)', display: 'grid', placeItems: 'center', fontSize: '0.9rem', fontWeight: 700, transition: 'all .2s', flexShrink: 0}}>
                      {checked ? '✓' : '+'}
                    </span>
                    <span>{t.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sort By */}
          <div style={{marginBottom: 16}}>
            <h4 style={{fontSize: '0.9rem', fontWeight: 700, marginBottom: 10, color: 'var(--ink)'}}>Sort By</h4>
            <div style={{display: 'grid', gap: 8}}>
              {sortOptions.map(s => (
                <label key={s.value} style={{display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: '0.88rem', color: sort === s.value ? 'var(--blue)' : 'var(--ink)', fontWeight: sort === s.value ? 700 : 400}}>
                  <input
                    type="radio"
                    name="sort"
                    checked={sort === s.value}
                    onChange={() => setSort(s.value)}
                    style={{accentColor: 'var(--blue)'}}
                  />
                  {s.label}
                </label>
              ))}
            </div>
          </div>

          {/* Clear Filters */}
          {(selectedNiches.length > 0 || selectedTypes.length > 0 || sort !== 'pop') && (
            <button className="link" onClick={clearFilters} style={{fontSize: '0.85rem', color: 'var(--mute)', display: 'flex', alignItems: 'center', gap: 6, marginTop: 12}}>
              Clear all filters ↻
            </button>
          )}
        </aside>

        {/* Right Main Content */}
        <main style={{minWidth: 0}}>
          {/* Active Chips Bar */}
          <div style={{display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center', marginBottom: 20}}>
            {selectedNiches.map(nVal => {
              const item = niches.find(n => n.value === nVal);
              return item ? (
                <span key={nVal} style={{background: 'var(--sage)', padding: '4px 12px', borderRadius: 99, fontSize: '0.8rem', display: 'inline-flex', alignItems: 'center', gap: 6, fontWeight: 600}}>
                  Niche: {item.label} <button onClick={() => toggleNiche(nVal)} style={{border: 0, background: 'none', cursor: 'pointer', fontWeight: 700}}>×</button>
                </span>
              ) : null;
            })}
            {selectedTypes.map(tVal => {
              const item = productTypes.find(t => t.value === tVal);
              return item ? (
                <span key={tVal} style={{background: 'var(--sage)', padding: '4px 12px', borderRadius: 99, fontSize: '0.8rem', display: 'inline-flex', alignItems: 'center', gap: 6, fontWeight: 600}}>
                  Type: {item.label} <button onClick={() => toggleType(tVal)} style={{border: 0, background: 'none', cursor: 'pointer', fontWeight: 700}}>×</button>
                </span>
              ) : null;
            })}
          </div>

          {/* Progress Bar during loading */}
          {loading && (
            <div style={{height: 3, width: '100%', background: 'rgba(36,60,143,0.1)', borderRadius: 99, overflow: 'hidden', marginBottom: 20}}>
              <div style={{height: '100%', width: '40%', background: 'var(--blue)', borderRadius: 99, animation: 'loadingBar 1.2s infinite ease-in-out'}} />
            </div>
          )}

          {/* Skeleton Grid while Loading */}
          {loading ? (
            <div className="grid" style={{gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 20}}>
              {[1, 2, 3, 4, 5, 6].map(n => (
                <div key={n} style={{background: '#fff', borderRadius: 'var(--r)', overflow: 'hidden', border: '1px solid var(--line)', padding: 14}}>
                  <div style={{aspectRatio: '1', borderRadius: 12, background: 'var(--bg)', opacity: 0.7, marginBottom: 12, animation: 'pulse 1.2s infinite ease-in-out'}} />
                  <div style={{height: 16, background: 'var(--bg)', borderRadius: 6, width: '75%', marginBottom: 6, animation: 'pulse 1.2s infinite ease-in-out'}} />
                  <div style={{height: 12, background: 'var(--bg)', borderRadius: 6, width: '40%', animation: 'pulse 1.2s infinite ease-in-out'}} />
                </div>
              ))}
            </div>
          ) : list.length ? (
            viewMode === 'grid' ? (
              <div className="grid" style={{gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 20}}>
                {list.map(p => <ProductCard key={p.id || p.slug} p={p}/>)}
              </div>
            ) : (
              <div style={{display: 'grid', gap: 14}}>
                {list.map(p => {
                  const title = p.name || p.title || 'Mug';
                  const price = p.price || 0;
                  const compare = p.compare_at_price || p.compare_price || 0;
                  return (
                    <div key={p.id || p.slug} className="shop-list-item" style={{background: '#fff', borderRadius: 'var(--r)', border: '1px solid var(--line)', padding: 14, display: 'grid', gridTemplateColumns: '100px 1fr auto', gap: 16, alignItems: 'center'}}>
                      <div style={{aspectRatio: '1', borderRadius: 10, overflow: 'hidden', background: 'var(--sage)'}}>
                        <Img src={p.images?.[0]} alt={title} style={{width: '100%', height: '100%', objectFit: 'cover'}}/>
                      </div>
                      <div>
                        <Link href={`/product/${p.slug || '#'}`} style={{fontWeight: 700, fontSize: '1rem', display: 'block', marginBottom: 2}}>{title}</Link>
                        {p.niche && (
                          <small style={{color: 'var(--mute)', display: 'block', marginBottom: 6}}>{p.niche}</small>
                        )}
                        <p style={{fontSize: '0.85rem', color: 'var(--mute)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden'}}>{p.description}</p>
                      </div>
                      <div style={{textAlign: 'right', display: 'grid', gap: 6}}>
                        <div style={{fontSize: '1rem', fontWeight: 700}}>{inr(price)} {compare > price && <s style={{fontSize: '0.8rem', color: 'var(--mute)', marginLeft: 4}}>{inr(compare)}</s>}</div>
                        <Link href={`/product/${p.slug || '#'}`} className="btn" style={{padding: '8px 14px', fontSize: '0.85rem'}}>View details</Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            )
          ) : (
            <div style={{padding: '48px 20px', textAlign: 'center', background: '#fff', borderRadius: 'var(--r)', border: '1px solid var(--line)'}}>
              <h3 style={{fontSize: '1.2rem', marginBottom: 8}}>No products match your filter</h3>
              <p style={{color: 'var(--mute)', marginBottom: 16, fontSize: '0.9rem'}}>Try clearing your active filters to explore more designs.</p>
              <button className="btn" onClick={clearFilters}>Reset filters</button>
            </div>
          )}
        </main>
      </div>

      {/* Loading bar & Responsive mobile styles */}
      <style jsx global>{`
        @keyframes loadingBar {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(250%); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 0.3; }
        }
        @media (max-width: 900px) {
          .shop-controls-bar {
            width: 100% !important;
            justify-content: space-between !important;
          }
          .shop-layout { grid-template-columns: 1fr !important; }
          .filter-sidebar {
            position: fixed !important;
            top: 0 !important;
            left: -100% !important;
            width: min(320px, 85vw) !important;
            height: 100vh !important;
            z-index: 100 !important;
            box-shadow: 10px 0 30px rgba(0,0,0,0.15) !important;
            transition: left 0.3s ease !important;
            overflow-y: auto !important;
          }
          .filter-sidebar.open { left: 0 !important; }
          .mob-filter-btn { display: inline-block !important; }
        }
        @media (max-width: 600px) {
          .shop-container { padding: 20px 12px 48px 12px !important; }
          .shop-promo-banner {
            padding: 12px 14px !important;
            border-radius: 14px !important;
            flex-direction: column !important;
            align-items: flex-start !important;
          }
          .shop-header-row {
            flex-direction: row !important;
            justify-content: space-between !important;
            align-items: center !important;
          }
          .shop-list-item {
            grid-template-columns: 80px 1fr !important;
          }
          .shop-list-item > div:last-child {
            grid-column: 1 / -1;
            display: flex !important;
            justify-content: space-between !important;
            align-items: center !important;
            border-top: 1px solid var(--line);
            padding-top: 10px;
            margin-top: 6px;
          }
        }
      `}</style>
    </div>
  );
}
