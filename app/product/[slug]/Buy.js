'use client';

import {useState} from 'react';
import {useRouter} from 'next/navigation';
import {inr} from '@/lib/format';
import {Img} from '@/components/ProductCard';
import {useCart} from '@/components/CartProvider';

function IconShieldCheck({size=16, color="var(--blue)"}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
      <polyline points="9 12 11 14 15 10"></polyline>
    </svg>
  );
}

function IconTruck({size=16, color="var(--blue)"}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="3" width="15" height="13"></rect>
      <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
      <circle cx="5.5" cy="18.5" r="2.5"></circle>
      <circle cx="18.5" cy="18.5" r="2.5"></circle>
    </svg>
  );
}

function IconSparkles({size=16, color="var(--blue)"}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l1.91 5.8 5.8 1.91-5.8 1.91L12 18.42l-1.91-5.8-5.8-1.91 5.8-1.91L12 3z"></path>
    </svg>
  );
}

export default function Buy({p}) {
  if (!p) return null;
  const [i, setI] = useState(0);
  const [q, setQ] = useState(1);
  const name = p.name || p.title || 'Mug';
  const sizes = p.sizes || [
    {name: '11 OZ (325 ml)', price: p.price || 499},
    {name: '25 OZ (750 ml)', price: (p.price || 499) + 400}
  ];
  const [selSize, setSelSize] = useState(sizes[0]);
  const [done, setDone] = useState(false);
  const {add, buyNow} = useCart();
  const r = useRouter();
  const currentPrice = selSize.price;

  return (
    <div className="pd" style={{padding: '24px 0'}}>
      {/* Product Image Gallery Column */}
      <div>
        <div style={{aspectRatio: '1', borderRadius: 'var(--r)', overflow: 'hidden', background: 'var(--sage)', border: '1px solid var(--line)'}}>
          <Img src={p.images?.[i]} alt={name} className="main-img" style={{width: '100%', height: '100%', objectFit: 'cover'}}/>
        </div>
        <div className="thumbs" style={{display: 'flex', gap: 10, marginTop: 12, overflowX: 'auto', paddingBottom: 4}}>
          {(p.images || []).map((s, k) => (
            <img
              key={k}
              src={s}
              alt={`View ${k + 1}`}
              onClick={() => setI(k)}
              style={{
                width: 68,
                height: 68,
                objectFit: 'cover',
                borderRadius: 10,
                cursor: 'pointer',
                border: i === k ? '2px solid var(--blue)' : '1px solid var(--line)',
                opacity: i === k ? 1 : 0.7,
                transition: 'all 0.2s ease',
                flexShrink: 0
              }}
            />
          ))}
        </div>
      </div>

      {/* Product Details & Actions Column */}
      <div>
        <span style={{fontSize: '0.8rem', fontWeight: 700, color: 'var(--blue)', background: 'rgba(36, 60, 143, 0.08)', padding: '4px 12px', borderRadius: 99, letterSpacing: '.04em', textTransform: 'uppercase', display: 'inline-block', marginBottom: 8}}>
          {p.category || p.niche || 'Original Sipware'}
        </span>
        <h1 style={{fontSize: 'clamp(1.8rem, 5vw, 2.6rem)', fontWeight: 800, margin: '4px 0 12px', lineHeight: 1.2}}>
          {name}
        </h1>
        <div style={{fontSize: '1.6rem', fontWeight: 800, color: 'var(--blue)', marginBottom: 16}}>
          {inr(currentPrice)}
        </div>
        <p style={{color: 'var(--mute)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: 20}}>
          {p.description}
        </p>

        {/* Size Capacity Chips */}
        <div style={{margin: '20px 0'}}>
          <label style={{display: 'block', fontWeight: 700, fontSize: '0.9rem', marginBottom: 10}}>
            Select Size &amp; Capacity:
          </label>
          <div style={{display: 'flex', gap: 10, flexWrap: 'wrap'}}>
            {sizes.map(s => (
              <button
                key={s.name}
                type="button"
                className={`chip ${selSize.name === s.name ? 'on' : ''}`}
                onClick={() => setSelSize(s)}
                style={{
                  padding: '10px 18px',
                  borderRadius: 99,
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                {s.name} — {inr(s.price)}
              </button>
            ))}
          </div>
        </div>

        {/* Specifications List */}
        {p.specs && Object.keys(p.specs).length > 0 && (
          <ul className="specs" style={{margin: '20px 0', padding: 0, listStyle: 'none', borderTop: '1px solid var(--line)'}}>
            {Object.entries(p.specs).map(([k, v]) => (
              <li key={k} style={{display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--line)', fontSize: '0.9rem'}}>
                <span style={{textTransform: 'capitalize', color: 'var(--mute)'}}>{k}</span>
                <span style={{fontWeight: 600}}>{v}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Feature Badges Card */}
        <div style={{background: '#fff', padding: 14, borderRadius: 14, border: '1px solid var(--line)', display: 'grid', gap: 8, fontSize: '0.85rem', color: 'var(--ink)', marginBottom: 24}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 8}}>
            <IconSparkles size={16} color="var(--blue)" />
            <span><b>HD Sublimation Print:</b> Ultra-vibrant zero-fade artwork</span>
          </div>
          <div style={{display: 'flex', alignItems: 'center', gap: 8}}>
            <IconShieldCheck size={16} color="var(--blue)" />
            <span><b>Premium Quality:</b> 100% Dishwasher &amp; Microwave Safe</span>
          </div>
          <div style={{display: 'flex', alignItems: 'center', gap: 8}}>
            <IconTruck size={16} color="var(--blue)" />
            <span><b>Fast Shipping:</b> Dispatched in 2-3 days via premier courier</span>
          </div>
        </div>

        {/* Quantity & CTA Buttons Row */}
        <div style={{display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center'}}>
          <div className="qty" style={{display: 'inline-flex', height: 46}}>
            <button onClick={() => setQ(Math.max(1, q - 1))} aria-label="Decrease" style={{width: 44, height: 44, fontSize: '1.2rem', fontWeight: 700}}>
              −
            </button>
            <span style={{minWidth: 32, textAlign: 'center', fontWeight: 700, fontSize: '1rem', lineHeight: '44px'}}>
              {q}
            </span>
            <button onClick={() => setQ(q + 1)} aria-label="Increase" style={{width: 44, height: 44, fontSize: '1.2rem', fontWeight: 700}}>
              +
            </button>
          </div>

          <button
            className="btn ghost"
            onClick={() => {
              add({...p, name: `${name} (${selSize.name})`, price: currentPrice}, q);
              setDone(true);
            }}
            style={{flex: '1 1 140px', padding: '14px 20px', fontSize: '0.95rem', fontWeight: 700}}
          >
            {done ? '✓ Added to cart' : 'Add to cart'}
          </button>

          <button
            className="btn"
            onClick={() => {
              buyNow({...p, name: `${name} (${selSize.name})`, price: currentPrice}, q);
              r.push('/checkout');
            }}
            style={{flex: '1 1 140px', padding: '14px 20px', fontSize: '0.95rem', fontWeight: 700}}
          >
            Buy now &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}
