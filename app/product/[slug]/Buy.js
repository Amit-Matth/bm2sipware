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

function IconZoom({size=16, color="currentColor"}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      <line x1="11" y1="8" x2="11" y2="14"></line>
      <line x1="8" y1="11" x2="14" y2="11"></line>
    </svg>
  );
}

const PRODUCT_SPECS_MAP = {
  'White Ceramic Mug': { 'Capacity': '11 Oz', 'Finish': 'Glossy Finish', 'Print': 'Fade Proof Print', 'Material': 'Ceramic Mug', 'Highlights': 'Full White, OEKO-TEX Certified, Box Packing, No Minimums' },
  'Black Ceramic Mug': { 'Capacity': '11 Oz', 'Finish': 'Glossy Finish', 'Print': 'Fade Proof Print', 'Material': 'Ceramic Mug', 'Highlights': 'Full Black Color, OEKO-TEX Certified, Box Packing, No Minimums' },
  'White Enamel Mug': { 'Capacity': '11 Oz', 'Finish': 'Silver Rim', 'Print': 'Fade Proof Print', 'Material': 'Stainless Steel (Enamel Coated)', 'Highlights': 'Dishwasher Safe, OEKO-TEX Certified, No Minimums' },
  'Magic Mug': { 'Capacity': '11 Oz', 'Finish': 'Glossy Finish', 'Print': 'Fade Proof Print', 'Material': 'Thermal Ceramic', 'Highlights': 'Magic Mug, OEKO-TEX Certified, Box Packing, No Minimums' },
  'Colour Mug': { 'Capacity': '11 Oz', 'Finish': 'Glossy Finish', 'Print': 'Fade Proof Print', 'Material': 'Ceramic Mug', 'Highlights': '8 Colors, OEKO-TEX Certified, Box Packing, No Minimums' },
  'Aluminium Sipper Bottle': { 'Capacity': '750 ml', 'Finish': 'Glossy Finish', 'Print': 'Fade Proof Print', 'Material': 'Aluminum Bottle', 'Highlights': 'Clip Cap, OEKO-TEX Certified, Eco-Friendly Nature, No Minimums' },
  'Steel Bottle': { 'Capacity': '25 Oz', 'Finish': 'Engraved', 'Print': 'Engraved', 'Material': 'Stainless Steel', 'Highlights': 'Leak Proof, BPA Free, Eco Friendly, Custom Gifting, No Minimums' }
};

export default function Buy({p}) {
  if (!p) return null;
  const [i, setI] = useState(0);
  const [q, setQ] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

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

  const images = p.images && p.images.length > 0 ? p.images : [];
  const currentImg = images[i] || '';
  const isDesignPng = currentImg.toLowerCase().endsWith('.png') || currentImg.toLowerCase().includes('design');

  const handleMouseDown = (e) => {
    if (!isZoomed) return;
    setIsDragging(true);
    setStartPos({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !isZoomed) return;
    setPan({
      x: e.clientX - startPos.x,
      y: e.clientY - startPos.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    if (i > 0) {
      setI(i - 1);
      setIsZoomed(false);
      setPan({ x: 0, y: 0 });
    }
  };

  const nextImage = (e) => {
    e.stopPropagation();
    if (i < images.length - 1) {
      setI(i + 1);
      setIsZoomed(false);
      setPan({ x: 0, y: 0 });
    }
  };

  const displaySpecs = (p.specs && Object.keys(p.specs).length > 0 && (p.specs.Capacity || p.specs.Finish || p.specs.Highlights || p.specs.Features))
    ? p.specs
    : (PRODUCT_SPECS_MAP[p.product_type] || PRODUCT_SPECS_MAP[p.name] || PRODUCT_SPECS_MAP['Steel Bottle'] || PRODUCT_SPECS_MAP['White Ceramic Mug']);

  const specsTableEntries = Object.entries(displaySpecs).filter(([k]) => k !== 'Highlights' && k !== 'Features' && k !== 'Print');
  const highlightsStr = displaySpecs.Highlights || displaySpecs.Features || 'Full White, OEKO-TEX Certified, Box Packing, No Minimums';
  const highlightsList = highlightsStr.split(',').map(s => s.trim()).filter(Boolean);

  return (
    <div className="pd" style={{padding: '24px 0'}}>
      {/* Product Image Gallery Column */}
      <div>
        <div
          style={{
            position: 'relative',
            aspectRatio: '1',
            borderRadius: 28,
            overflow: 'hidden',
            background: '#fff',
            border: '1px solid var(--line)',
            boxShadow: '0 12px 32px rgba(0,0,0,0.06)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 24
          }}
        >
          <div
            onClick={() => {
              if (!isDragging) {
                const nextZoom = !isZoomed;
                setIsZoomed(nextZoom);
                if (!nextZoom) setPan({ x: 0, y: 0 });
              }
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: isZoomed ? (isDragging ? 'grabbing' : 'grab') : 'zoom-in',
              overflow: 'hidden',
              userSelect: 'none',
              background: '#fff',
              borderRadius: 16
            }}
          >
            <Img
              src={images[i]}
              alt={name}
              className="main-img"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                background: '#fff',
                transform: isZoomed ? `scale(1.8) translate(${pan.x}px, ${pan.y}px)` : 'scale(1)',
                transition: isDragging ? 'none' : 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                pointerEvents: 'none'
              }}
            />
          </div>

          {/* Zoom Toggle Button with Lucide Icon */}
          <button
            type="button"
            onClick={() => {
              const nextZoom = !isZoomed;
              setIsZoomed(nextZoom);
              if (!nextZoom) setPan({ x: 0, y: 0 });
            }}
            style={{
              position: 'absolute',
              bottom: 16,
              right: 16,
              background: 'rgba(255, 255, 255, 0.95)',
              border: '1px solid var(--line)',
              borderRadius: 12,
              padding: '8px 12px',
              fontSize: '0.85rem',
              fontWeight: 700,
              color: 'var(--ink)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
              zIndex: 10,
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'var(--blue)';
              e.currentTarget.style.color = '#fff';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.95)';
              e.currentTarget.style.color = 'var(--ink)';
            }}
          >
            <IconZoom size={16} color="currentColor" /> {isZoomed ? 'Reset Zoom' : 'Zoom In'}
          </button>

          {/* Previous Arrow Button */}
          {images.length > 1 && (
            <button
              type="button"
              onClick={prevImage}
              disabled={i === 0}
              style={{
                position: 'absolute',
                left: 12,
                top: '50%',
                transform: 'translateY(-50%)',
                width: 38,
                height: 38,
                borderRadius: '50%',
                background: i === 0 ? 'rgba(255,255,255,0.4)' : '#fff',
                border: '1px solid var(--line)',
                cursor: i === 0 ? 'not-allowed' : 'pointer',
                display: 'grid',
                placeItems: 'center',
                boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
                opacity: i === 0 ? 0.4 : 1,
                transition: 'all 0.2s ease',
                zIndex: 10
              }}
              title="Previous Image"
            >
              <span style={{fontSize: '1.2rem', fontWeight: 800, color: 'var(--ink)'}}>‹</span>
            </button>
          )}

          {/* Next Arrow Button */}
          {images.length > 1 && (
            <button
              type="button"
              onClick={nextImage}
              disabled={i >= images.length - 1}
              style={{
                position: 'absolute',
                right: 12,
                top: '50%',
                transform: 'translateY(-50%)',
                width: 38,
                height: 38,
                borderRadius: '50%',
                background: i >= images.length - 1 ? 'rgba(255,255,255,0.4)' : '#fff',
                border: '1px solid var(--line)',
                cursor: i >= images.length - 1 ? 'not-allowed' : 'pointer',
                display: 'grid',
                placeItems: 'center',
                boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
                opacity: i >= images.length - 1 ? 0.4 : 1,
                transition: 'all 0.2s ease',
                zIndex: 10
              }}
              title="Next Image"
            >
              <span style={{fontSize: '1.2rem', fontWeight: 800, color: 'var(--ink)'}}>›</span>
            </button>
          )}
        </div>

        {/* Thumbnails Row */}
        {images.length > 1 && (
          <div className="thumbs" style={{display: 'flex', gap: 10, marginTop: 12, overflowX: 'auto', paddingBottom: 4}}>
            {images.map((s, k) => (
              <Img
                key={k}
                src={s}
                alt={`View ${k + 1}`}
                onClick={() => {
                  setI(k);
                  setIsZoomed(false);
                  setPan({ x: 0, y: 0 });
                }}
                style={{
                  width: 68,
                  height: 68,
                  objectFit: 'cover',
                  padding: 2,
                  background: '#fff',
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
        )}
      </div>

      {/* Product Details & Actions Column */}
      <div>
        {p.niche && (
          <span style={{fontSize: '0.8rem', fontWeight: 700, color: 'var(--blue)', background: 'rgba(36, 60, 143, 0.08)', padding: '4px 12px', borderRadius: 99, letterSpacing: '.04em', textTransform: 'uppercase', display: 'inline-block', marginBottom: 8}}>
            {p.niche}
          </span>
        )}
        <h1 style={{fontSize: 'clamp(1.8rem, 5vw, 2.6rem)', fontWeight: 800, margin: '4px 0 12px', lineHeight: 1.2}}>
          {name}
        </h1>
        <div style={{fontSize: '1.6rem', fontWeight: 800, color: 'var(--blue)', marginBottom: 16}}>
          {inr(currentPrice)}
        </div>
        <p style={{color: 'var(--mute)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: 20}}>
          {p.description}
        </p>

        {/* Specifications Table */}
        {specsTableEntries.length > 0 && (
          <ul className="specs" style={{margin: '20px 0', padding: 0, listStyle: 'none', borderTop: '1px solid var(--line)'}}>
            {specsTableEntries.map(([k, v]) => (
              <li key={k} style={{display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--line)', fontSize: '0.9rem'}}>
                <span style={{textTransform: 'capitalize', color: 'var(--mute)', fontWeight: 500}}>{k}</span>
                <span style={{fontWeight: 700, color: 'var(--ink)', textAlign: 'right'}}>{v}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Product Highlights Card */}
        {highlightsList.length > 0 && (
          <div style={{background: '#fff', padding: 16, borderRadius: 16, border: '1px solid var(--line)', display: 'grid', gap: 10, fontSize: '0.88rem', color: 'var(--ink)', marginBottom: 24}}>
            <div style={{fontWeight: 700, fontSize: '0.92rem', color: 'var(--blue)', marginBottom: 2, display: 'flex', alignItems: 'center', gap: 6}}>
              <IconSparkles size={16} color="var(--blue)" />
              Product Highlights
            </div>
            {highlightsList.map((tag, idx) => (
              <div key={idx} style={{display: 'flex', alignItems: 'center', gap: 8}}>
                <IconShieldCheck size={16} color="var(--blue)" />
                <span style={{fontWeight: 600}}>{tag}</span>
              </div>
            ))}
          </div>
        )}

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
