'use client';

import {createContext, useContext, useEffect, useState} from 'react';
import Link from 'next/link';

function IconCheckCircle({size=16, color="#10B981"}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
  );
}

const C = createContext();
export const useCart = () => useContext(C);

export default function CartProvider({children}) {
  const [items, set] = useState([]);
  const [toast, setToast] = useState(null);
  const [cartBump, setCartBump] = useState(false);

  useEffect(() => {
    try { set(JSON.parse(localStorage.getItem('cart') || '[]')); } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const add = (p, qty = 1) => {
    const cartKey = p.name;
    set(s => {
      const existing = s.find(i => i.cartKey === cartKey || i.id === p.id);
      if (existing && existing.price === p.price) {
        return s.map(i => (i.cartKey === cartKey || i.id === p.id) ? {...i, qty: i.qty + qty} : i);
      }
      return [...s, {id: p.id, cartKey, slug: p.slug, name: p.name, price: p.price, image: p.images?.[0] || p.image || '', qty}];
    });

    // Trigger Header Cart Pulse Animation
    setCartBump(true);
    setTimeout(() => setCartBump(false), 500);

    // Trigger Floating Toast Notification
    setToast({
      name: p.name,
      price: p.price,
      image: p.images?.[0] || p.image || '',
      qty
    });
    setTimeout(() => {
      setToast(null);
    }, 3200);
  };

  const buyNow = (p, qty = 1) => {
    const cartKey = p.name;
    const newItem = {
      id: p.id,
      cartKey,
      slug: p.slug,
      name: p.name,
      price: p.price,
      image: p.images?.[0] || p.image || '',
      qty
    };
    set([newItem]);
    // Direct buy: set item for checkout without triggering floating "Added to Cart" toast or cart bump animation
  };

  const setQty = (cartKey, q) => set(s => q < 1 ? s.filter(i => i.cartKey !== cartKey && i.id !== cartKey) : s.map(i => (i.cartKey === cartKey || i.id === cartKey) ? {...i, qty: q} : i));
  const clear = () => set([]);
  const count = items.reduce((a, i) => a + i.qty, 0);
  const subtotal = items.reduce((a, i) => a + i.qty * i.price, 0);

  return (
    <C.Provider value={{items, add, buyNow, setQty, clear, count, subtotal, cartBump}}>
      {children}
      {/* Floating Add to Cart Toast Notification */}
      {toast && (
        <div
          style={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            zIndex: 9999,
            background: '#16202B',
            color: '#fff',
            padding: '14px 18px',
            borderRadius: '16px',
            boxShadow: '0 16px 40px rgba(0,0,0,0.25)',
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            minWidth: 320,
            maxWidth: 420,
            border: '1px solid rgba(255,255,255,0.15)',
            animation: 'toastPop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
          }}
        >
          <div style={{width: 44, height: 44, borderRadius: 10, overflow: 'hidden', background: '#fff', flexShrink: 0, border: '1px solid rgba(255,255,255,0.2)'}}>
            {toast.image ? (
              <img src={toast.image} alt={toast.name} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
            ) : (
              <div style={{width: '100%', height: '100%', display: 'grid', placeItems: 'center', fontSize: '1.2rem', color: '#16202B'}}>☕</div>
            )}
          </div>
          <div style={{flex: 1, minWidth: 0}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.8rem', fontWeight: 700, color: '#10B981', marginBottom: 2}}>
              <IconCheckCircle size={14} color="#10B981" /> Added to Cart!
            </div>
            <div style={{fontSize: '0.9rem', fontWeight: 700, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap'}}>
              {toast.name}
            </div>
          </div>
          <Link
            href="/cart"
            onClick={() => setToast(null)}
            style={{
              background: 'var(--blue)',
              color: '#fff',
              padding: '8px 14px',
              borderRadius: 99,
              fontSize: '0.8rem',
              fontWeight: 700,
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              boxShadow: '0 4px 12px rgba(36,60,143,0.4)'
            }}
          >
            View Cart &rarr;
          </Link>
        </div>
      )}
    </C.Provider>
  );
}
