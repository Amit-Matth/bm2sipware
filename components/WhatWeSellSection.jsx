'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Img } from '@/components/ProductCard';

const PRODUCTS = [
  { name: 'Aluminium Sipper Bottle', image: '/products/Aluminium Sipper Bottle.png' },
  { name: 'White Ceramic Mug', image: '/products/White Ceramic Coffee Mug.png' },
  { name: 'Black Ceramic Mug', image: '/products/Black Ceramic Coffee Mug.png' },
  { name: 'Steel Bottle', image: '/products/Stainless Steel Water Bottle.png' },
  { name: 'White Enamel Mug', image: '/products/White Enamel Mug.png' },
  { name: 'Magic Mug', image: '/products/Magic Ceramic Coffee Mug.png' },
  { name: 'Colour Mug', image: '/products/Colour Ceramic Coffee Mug.png' }
];

export default function WhatWeSellSection() {
  const [showAll, setShowAll] = useState(false);

  return (
    <section>
      <div className="wrap">
        <div className="row" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20}}>
          <h2 style={{fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)', fontWeight: 800, margin: 0}}>What we sell</h2>
          <div style={{display: 'flex', gap: 12, alignItems: 'center'}}>
            <button
              onClick={() => setShowAll(!showAll)}
              className="btn ghost"
              style={{
                padding: '8px 18px',
                fontSize: '0.88rem',
                borderRadius: 99,
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              {showAll ? 'Show Less \u2191' : 'View All (7) \u2192'}
            </button>
          </div>
        </div>
        <div className="grid" style={{gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 20}}>
          {PRODUCTS.map((p, i) => {
            const isHidden = !showAll && i >= 4;
            return (
              <div
                key={i}
                style={{
                  opacity: isHidden ? 0 : 1,
                  transform: isHidden ? 'translateY(24px) scale(0.95)' : 'translateY(0) scale(1)',
                  maxHeight: isHidden ? '0px' : '600px',
                  overflow: 'hidden',
                  visibility: isHidden ? 'hidden' : 'visible',
                  transition: 'all 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
                  transitionProperty: 'opacity, transform, max-height'
                }}
              >
                <Link href="/shop" className="showcase-card" style={{textDecoration: 'none', color: 'inherit', background: '#fff', borderRadius: 20, overflow: 'hidden', border: '1px solid var(--line)', display: 'block', height: '100%', transition: 'transform 0.3s ease'}}>
                  <div style={{aspectRatio: '1', overflow: 'hidden', background: '#d3d8db'}}>
                    <Img src={p.image} alt={p.name} style={{width: '100%', height: '100%', objectFit: 'contain'}}/>
                  </div>
                  <div style={{padding: '16px', textAlign: 'center'}}>
                    <h3 style={{fontSize: '1.05rem', fontWeight: 700, color: 'var(--ink)', margin: 0}}>{p.name}</h3>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
