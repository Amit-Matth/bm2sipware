'use client';

import Link from 'next/link';
import {useState, useEffect} from 'react';
import {inr} from '@/lib/format';

export const Img = ({src, alt, ...p}) => {
  const [imgSrc, setImgSrc] = useState(null);
  const [useFallback, setUseFallback] = useState(false);

  useEffect(() => {
    setUseFallback(false);
    if (!src) {
      setImgSrc(null);
      return;
    }
    const urlEndpoint = 'https://ik.imagekit.io/bm2sipware';
    if (src.includes('ik.imagekit.io')) {
      setImgSrc(src);
    } else if (src.startsWith('/')) {
      setImgSrc(`${urlEndpoint}${src}`);
    } else if (!src.startsWith('http')) {
      setImgSrc(`${urlEndpoint}/${src}`);
    } else {
      setImgSrc(src);
    }
  }, [src]);

  if (!src || !imgSrc) return <div className="ph" role="img" aria-label={alt}>☕</div>;

  const currentSrc = useFallback ? src : imgSrc;

  return (
    <img
      src={currentSrc}
      alt={alt}
      loading="lazy"
      onError={() => {
        if (!useFallback) {
          setUseFallback(true);
        }
      }}
      {...p}
    />
  );
};

export default function ProductCard({p}){
  if(!p)return null;
  const [hovered, setHovered] = useState(false);
  const [navigating, setNavigating] = useState(false);

  const title = p.name || p.title || 'Mug';
  const price = p.price || 0;
  const compare = p.compare_at_price || p.compare_price || 0;
  const niche = p.niche || 'Roots';

  const defaultImg = p.images?.[0];
  const designImg = p.design_url || p.images?.[1];

  return (
    <article
      className="card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
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
        <div className="cimg" style={{position: 'relative', width: '100%', aspectRatio: '1', background: '#fff', overflow: 'hidden'}}>
          <Link
            href={`/product/${p.slug||'#'}`}
            onClick={() => setNavigating(true)}
            style={{display: 'block', width: '100%', height: '100%', position: 'relative'}}
          >
            <Img
              src={(hovered && designImg) ? designImg : defaultImg}
              alt={title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                background: '#fff',
                transition: 'opacity 0.2s ease, transform 0.4s ease'
              }}
            />
            {navigating && (
              <div style={{position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(4px)', display: 'grid', placeItems: 'center', zIndex: 10}}>
                <div style={{width: 32, height: 32, border: '3px solid var(--line)', borderTopColor: 'var(--blue)', borderRadius: '50%', animation: 'spin 0.6s linear infinite'}} />
              </div>
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
        <div style={{padding: '16px 16px 16px 16px'}}>
          <Link
            href={`/product/${p.slug||'#'}`}
            onClick={() => setNavigating(true)}
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
    </article>
  );
}
