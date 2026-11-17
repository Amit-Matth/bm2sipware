'use client';

import Link from 'next/link';
import {useState, useEffect} from 'react';
import {createPortal} from 'react-dom';
import {inr} from '@/lib/format';
import {useCart} from './CartProvider';

function IconShoppingBag({size=18, color="currentColor"}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{display:'inline-block', verticalAlign:'middle', marginRight:6}}>
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
      <line x1="3" y1="6" x2="21" y2="6"></line>
      <path d="M16 10a4 4 0 0 1-8 0"></path>
    </svg>
  );
}

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

export const Img = ({src, alt, ...p}) => {
  if (!src) return <div className="ph" role="img" aria-label={alt}>☕</div>;
  let finalSrc = src;
  const urlEndpoint = 'https://ik.imagekit.io/bm2sipware';
  if (src.includes('ik.imagekit.io')) {
    finalSrc = src;
  } else if (src.startsWith('/')) {
    finalSrc = `${urlEndpoint}${src}`;
  } else if (!src.startsWith('http')) {
    finalSrc = `${urlEndpoint}/${src}`;
  }
  return <img src={finalSrc} alt={alt} loading="lazy" {...p} />;
};

export default function ProductCard({p}){
  if(!p)return null;
  const [q, setQ] = useState(false);
  const [mounted, setMounted] = useState(false);
  const {add} = useCart();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (q) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [q]);

  const title = p.name || p.title || 'Mug';
  const price = p.price || 0;
  const compare = p.compare_at_price || p.compare_price || 0;
  const niche = p.niche || 'Roots';

  return (
    <>
      <article
        className="card"
        style={{
          background: '#fff',
          borderRadius: 20,
          border: '1px solid var(--line)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justify: 'space-between',
          transition: 'all 0.35s ease',
          boxShadow: '0 4px 16px rgba(0,0,0,0.03)'
        }}
      >
        <div>
          {/* Edge-to-edge Top Image */}
          <div style={{position: 'relative', width: '100%', aspectRatio: '1', background: '#d3d8db', overflow: 'hidden'}}>
            <Link href={`/product/${p.slug||'#'}`} style={{display: 'block', width: '100%', height: '100%'}}>
              <Img
                src={p.images?.[0]}
                alt={title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  transition: 'transform 0.4s ease'
                }}
              />
              {p.images?.[1] && (
                <Img
                  src={p.images[1]}
                  alt=""
                  className="alt"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    opacity: 0,
                    transition: 'opacity 0.4s ease'
                  }}
                />
              )}
            </Link>

            {p.niche && (
              <span
                style={{
                  position: 'absolute',
                  top: 12,
                  left: 12,
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  color: 'var(--blue)',
                  background: 'rgba(255,255,255,0.92)',
                  backdropFilter: 'blur(8px)',
                  padding: '4px 12px',
                  borderRadius: 99,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  letterSpacing: '.03em',
                  pointerEvents: 'none'
                }}
              >
                {p.niche}
              </span>
            )}
          </div>

          {/* Card Info Section with Padding */}
          <div style={{padding: '16px 16px 0 16px'}}>
            <Link
              href={`/product/${p.slug||'#'}`}
              style={{
                fontWeight: 700,
                fontSize: '1rem',
                color: 'var(--ink)',
                lineHeight: 1.3,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                marginBottom: 8
              }}
            >
              {title}
            </Link>

            <div style={{display: 'flex', alignItems: 'baseline', gap: 8}}>
              <span style={{fontSize: '1.2rem', fontWeight: 800, color: 'var(--blue)'}}>
                {inr(price)}
              </span>
              {compare > price && (
                <s style={{color: 'var(--mute)', fontSize: '0.88rem'}}>{inr(compare)}</s>
              )}
            </div>
          </div>
        </div>

        {/* Card Action Button with Padding */}
        <div style={{padding: '14px 16px 16px 16px'}}>
          <button
            type="button"
            onClick={() => setQ(true)}
            style={{
              width: '100%',
              padding: '10px 14px',
              borderRadius: 12,
              border: '1px solid var(--line)',
              background: 'var(--bg)',
              color: 'var(--ink)',
              fontSize: '0.88rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'var(--blue)';
              e.currentTarget.style.color = '#fff';
              e.currentTarget.style.borderColor = 'var(--blue)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'var(--bg)';
              e.currentTarget.style.color = 'var(--ink)';
              e.currentTarget.style.borderColor = 'var(--line)';
            }}
          >
            <IconShoppingBag size={15} color="currentColor" /> Quick View
          </button>
        </div>
      </article>

      {/* Render Quick View Modal into body portal to bypass card stacking context */}
      {q && mounted && createPortal(
        <div className="modal" onClick={() => setQ(false)} style={{backdropFilter: 'blur(8px)', padding: 16, zIndex: 9999}}>
          <div
            className="mbox"
            onClick={e => e.stopPropagation()}
            style={{
              position: 'relative',
              background: '#fff',
              borderRadius: '20px',
              padding: '24px 20px',
              maxWidth: '800px',
              width: '100%',
              border: '1px solid var(--line)',
              boxShadow: '0 20px 50px rgba(0,0,0,0.25)',
              zIndex: 10000
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => setQ(false)}
              aria-label="Close modal"
              style={{
                position: 'absolute',
                top: 12,
                right: 12,
                width: 36,
                height: 36,
                borderRadius: '50%',
                background: 'var(--bg)',
                border: '1px solid var(--line)',
                fontSize: '1.2rem',
                cursor: 'pointer',
                display: 'grid',
                placeItems: 'center',
                color: 'var(--ink)',
                zIndex: 10
              }}
            >
              &times;
            </button>

            {/* Left Column: Image */}
            <div style={{aspectRatio: '1', borderRadius: '14px', overflow: 'hidden', background: 'var(--sage)', border: '1px solid var(--line)'}}>
              <Img src={p.images?.[0]} alt={title} style={{width: '100%', height: '100%', objectFit: 'cover'}}/>
            </div>

            {/* Right Column: Details & Actions */}
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
              <div>
                {niche && (
                  <span style={{fontSize: '0.78rem', fontWeight: 700, color: 'var(--blue)', background: 'rgba(36, 60, 143, 0.08)', padding: '3px 10px', borderRadius: 99, letterSpacing: '.04em', textTransform: 'uppercase', display: 'inline-block', marginBottom: 8}}>
                    {niche}
                  </span>
                )}
                <h3 style={{fontSize: 'clamp(1.2rem, 4vw, 1.5rem)', fontWeight: 800, color: 'var(--ink)', marginBottom: 6, lineHeight: 1.2}}>
                  {title}
                </h3>

                <div style={{display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 12}}>
                  <span style={{fontSize: '1.35rem', fontWeight: 800, color: 'var(--blue)'}}>{inr(price)}</span>
                  {compare > price && (
                    <s style={{color: 'var(--mute)', fontSize: '0.9rem'}}>{inr(compare)}</s>
                  )}
                </div>

                <p style={{color: 'var(--mute)', fontSize: '0.88rem', lineHeight: 1.5, marginBottom: 16}}>
                  {p.description || 'Vibrant, durable print-on-demand mug designed with high-definition sublimation artwork.'}
                </p>

                {/* Feature Highlights */}
                <div style={{background: 'var(--bg)', padding: 12, borderRadius: 12, border: '1px solid var(--line)', display: 'grid', gap: 6, fontSize: '0.82rem', color: 'var(--ink)', marginBottom: 20}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: 6}}>
                    <IconSparkles size={15} color="var(--blue)" />
                    <span><b>HD Sublimation Print:</b> Zero-fade vibrant artwork</span>
                  </div>
                  <div style={{display: 'flex', alignItems: 'center', gap: 6}}>
                    <IconShieldCheck size={15} color="var(--blue)" />
                    <span><b>Durable Build:</b> 100% Dishwasher &amp; Microwave Safe</span>
                  </div>
                  <div style={{display: 'flex', alignItems: 'center', gap: 6}}>
                    <IconTruck size={15} color="var(--blue)" />
                    <span><b>Fast Shipping:</b> Dispatched in 2-3 business days</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div style={{display: 'flex', gap: 10, flexWrap: 'wrap'}}>
                <button
                  className="btn"
                  onClick={() => { add({...p, name: title}, 1); setQ(false); }}
                  style={{flex: '1 1 130px', padding: '12px 16px', borderRadius: 12, fontWeight: 700, fontSize: '0.9rem'}}
                >
                  <IconShoppingBag size={16} color="#fff" /> Add to cart
                </button>
                <Link
                  className="btn ghost"
                  href={`/product/${p.slug || '#'}`}
                  onClick={() => setQ(false)}
                  style={{flex: '1 1 110px', padding: '12px 16px', borderRadius: 12, fontWeight: 700, fontSize: '0.9rem', textDecoration: 'none', textAlign: 'center'}}
                >
                  Full details &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
