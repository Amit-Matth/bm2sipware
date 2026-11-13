'use client';

import {useState, useEffect} from 'react';
import Link from 'next/link';
import {useCart} from '@/components/CartProvider';
import {inr, calcDeliveryFee, calcGiftFee, GIFT_PACKAGING_PER_UNIT} from '@/lib/format';
import {Img} from '@/components/ProductCard';

// Clean SVG Icons
function IconMug({size=32, color="var(--blue)"}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 8h1a4 4 0 1 1 0 8h-1"></path>
      <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8z"></path>
      <line x1="6" y1="2" x2="6" y2="4"></line>
      <line x1="10" y1="2" x2="10" y2="4"></line>
      <line x1="14" y1="2" x2="14" y2="4"></line>
    </svg>
  );
}

function IconSparkles({size=18, color="var(--blue)"}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l1.91 5.8 5.8 1.91-5.8 1.91L12 18.42l-1.91-5.8-5.8-1.91 5.8-1.91L12 3z"></path>
    </svg>
  );
}

function IconPackage({size=20, color="var(--blue)"}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
      <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
      <line x1="12" y1="22.08" x2="12" y2="12"></line>
    </svg>
  );
}

function IconGift({size=18, color="var(--blue)"}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 12 20 22 4 22 4 12"></polyline>
      <rect x="2" y="7" width="20" height="5"></rect>
      <line x1="12" y1="22" x2="12" y2="7"></line>
      <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path>
      <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path>
    </svg>
  );
}

function IconTrash({size=16, color="currentColor"}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6"></polyline>
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
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

function IconClipboard({size=18, color="var(--blue)"}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
      <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
    </svg>
  );
}

export default function Cart() {
  const {items, setQty, subtotal, count} = useCart();
  const [giftPackaging, setGiftPackaging] = useState(false);

  useEffect(() => {
    try {
      setGiftPackaging(localStorage.getItem('giftPackaging') === 'true');
    } catch {}
  }, []);

  const handleGiftToggle = (e) => {
    const checked = e.target.checked;
    setGiftPackaging(checked);
    try {
      localStorage.setItem('giftPackaging', checked ? 'true' : 'false');
    } catch {}
  };

  // Ultra-Cool Empty Cart State
  if (!items.length) {
    return (
      <div className="wrap" style={{maxWidth: 960, padding: '48px 16px 72px 16px'}}>

        {/* Cool Hero Container */}
        <div
          style={{
            background: 'linear-gradient(135deg, #ffffff 0%, var(--bg) 100%)',
            border: '1px solid var(--line)',
            borderRadius: 28,
            padding: '48px 24px',
            textAlign: 'center',
            boxShadow: '0 16px 40px rgba(0,0,0,0.04)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Subtle Decorative Background Circle */}
          <div
            style={{
              position: 'absolute',
              top: '-40px',
              right: '-40px',
              width: 180,
              height: 180,
              borderRadius: '50%',
              background: 'rgba(36, 60, 143, 0.05)',
              pointerEvents: 'none'
            }}
          />

          {/* Animated Icon Badge */}
          <div
            style={{
              width: 84,
              height: 84,
              borderRadius: 26,
              background: '#fff',
              border: '1px solid var(--line)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px',
              boxShadow: '0 12px 28px rgba(36, 60, 143, 0.12)'
            }}
          >
            <IconMug size={42} color="var(--blue)" />
          </div>

          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              fontSize: '0.8rem',
              fontWeight: 800,
              color: 'var(--blue)',
              background: 'rgba(36, 60, 143, 0.08)',
              padding: '6px 14px',
              borderRadius: 99,
              letterSpacing: '.04em',
              textTransform: 'uppercase',
              marginBottom: 14
            }}
          >
            <IconSparkles size={14} color="var(--blue)" />
            Your Cart Is Empty
          </span>

          <h1 style={{fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', fontWeight: 800, marginBottom: 12, lineHeight: 1.2}}>
            Ready to find your favorite mug?
          </h1>

          <p style={{color: 'var(--mute)', fontSize: '0.98rem', maxWidth: 520, margin: '0 auto 28px', lineHeight: 1.6}}>
            Explore our handcrafted original art mugs, temperature-retaining thermos flasks, and custom photo print drinkware.
          </p>

          <div style={{display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 36}}>
            <Link
              className="btn"
              href="/shop"
              style={{
                padding: '16px 32px',
                borderRadius: 99,
                fontWeight: 800,
                fontSize: '1rem',
                boxShadow: '0 8px 24px rgba(36,60,143,0.3)'
              }}
            >
              Explore Shop Collection &rarr;
            </Link>

            <Link
              className="btn ghost"
              href="/custom-print"
              style={{
                padding: '16px 28px',
                borderRadius: 99,
                fontWeight: 700,
                fontSize: '1rem'
              }}
            >
              ✨ Order Custom Print
            </Link>
          </div>

          {/* Quick Feature Badges Row */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: 14,
              maxWidth: 780,
              margin: '0 auto',
              borderTop: '1px solid var(--line)',
              paddingTop: 28,
              textAlign: 'left'
            }}
          >
            <div style={{display: 'flex', alignItems: 'center', gap: 12, background: '#fff', padding: 14, borderRadius: 16, border: '1px solid var(--line)'}}>
              <div style={{width: 38, height: 38, borderRadius: 10, background: 'rgba(36,60,143,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
                <IconSparkles size={18} color="var(--blue)" />
              </div>
              <div>
                <div style={{fontWeight: 700, fontSize: '0.88rem'}}>HD Sublimation Artwork</div>
                <div style={{fontSize: '0.78rem', color: 'var(--mute)'}}>Zero-fade vibrant prints</div>
              </div>
            </div>

            <div style={{display: 'flex', alignItems: 'center', gap: 12, background: '#fff', padding: 14, borderRadius: 16, border: '1px solid var(--line)'}}>
              <div style={{width: 38, height: 38, borderRadius: 10, background: 'rgba(36,60,143,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
                <IconShieldCheck size={18} color="var(--blue)" />
              </div>
              <div>
                <div style={{fontWeight: 700, fontSize: '0.88rem'}}>Microwave &amp; Dishwasher Safe</div>
                <div style={{fontSize: '0.78rem', color: 'var(--mute)'}}>100% Premium Ceramic</div>
              </div>
            </div>

            <div style={{display: 'flex', alignItems: 'center', gap: 12, background: '#fff', padding: 14, borderRadius: 16, border: '1px solid var(--line)'}}>
              <div style={{width: 38, height: 38, borderRadius: 10, background: 'rgba(36,60,143,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
                <IconTruck size={18} color="var(--blue)" />
              </div>
              <div>
                <div style={{fontWeight: 700, fontSize: '0.88rem'}}>All-India Express Delivery</div>
                <div style={{fontSize: '0.78rem', color: 'var(--mute)'}}>Dispatched in 2-3 business days</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }

  const deliveryFee = calcDeliveryFee(count);
  const giftFee = calcGiftFee(count, giftPackaging);
  const total = subtotal + deliveryFee + giftFee;

  return (
    <div className="wrap" style={{maxWidth: 1050, padding: '36px 16px 64px 16px'}}>

      {/* Header Row */}
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 12}}>
        <div>
          <h1 style={{fontSize: 'clamp(1.8rem, 5vw, 2.4rem)', fontWeight: 800, marginBottom: 4}}>Your Shopping Cart</h1>
          <p style={{color: 'var(--mute)', fontSize: '0.9rem'}}>Review your items before proceeding to checkout</p>
        </div>
        <span style={{fontSize: '0.8rem', fontWeight: 800, color: 'var(--blue)', background: 'rgba(36, 60, 143, 0.08)', padding: '6px 14px', borderRadius: 99, border: '1px solid rgba(36, 60, 143, 0.15)'}}>
          {count} {count === 1 ? 'ITEM' : 'ITEMS'}
        </span>
      </div>

      <div className="cart-grid" style={{display: 'grid', gridTemplateColumns: '1fr 360px', gap: 24, alignItems: 'start'}}>

        {/* Left Side: Cart Items List Card */}
        <div style={{background: '#fff', padding: 24, borderRadius: 20, border: '1px solid var(--line)', boxShadow: '0 4px 20px rgba(0,0,0,0.02)'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20, paddingBottom: 14, borderBottom: '1px solid var(--line)'}}>
            <div style={{width: 36, height: 36, borderRadius: 10, background: 'rgba(36,60,143,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
              <IconPackage size={18} color="var(--blue)" />
            </div>
            <h2 style={{fontSize: '1.15rem', fontWeight: 800, margin: 0}}>Selected Items</h2>
          </div>

          <div style={{display: 'grid', gap: 16}}>
            {items.map(i => (
              <div
                key={i.cartKey || i.id}
                className="cart-item-row"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '76px 1fr auto',
                  gap: 16,
                  alignItems: 'center',
                  paddingBottom: 16,
                  borderBottom: '1px solid var(--line)'
                }}
              >
                <div style={{width: 76, height: 76, borderRadius: 12, overflow: 'hidden', border: '1px solid var(--line)', background: 'var(--sage)', flexShrink: 0}}>
                  <Img src={i.image} alt={i.name}/>
                </div>

                <div style={{minWidth: 0}}>
                  <Link href={`/product/${i.slug}`} style={{fontWeight: 700, fontSize: '0.95rem', color: 'var(--ink)', textDecoration: 'none', display: 'block', marginBottom: 2, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap'}}>
                    {i.name}
                  </Link>
                  <div style={{fontWeight: 800, color: 'var(--blue)', fontSize: '1rem', marginBottom: 8}}>
                    {inr(i.price)}
                  </div>

                  {/* Quantity Controller */}
                  <div className="qty" style={{display: 'inline-flex', alignItems: 'center', border: '1px solid var(--line)', borderRadius: 99, background: 'var(--bg)'}}>
                    <button onClick={() => setQty(i.cartKey || i.id, i.qty - 1)} aria-label="Decrease" style={{border: 0, background: 'none', width: 32, height: 32, fontSize: '1rem', cursor: 'pointer', fontWeight: 700, color: 'var(--ink)'}}>
                      −
                    </button>
                    <span style={{minWidth: 24, textAlign: 'center', fontWeight: 700, fontSize: '0.9rem'}}>{i.qty}</span>
                    <button onClick={() => setQty(i.cartKey || i.id, i.qty + 1)} aria-label="Increase" style={{border: 0, background: 'none', width: 32, height: 32, fontSize: '1rem', cursor: 'pointer', fontWeight: 700, color: 'var(--ink)'}}>
                      +
                    </button>
                  </div>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => setQty(i.cartKey || i.id, 0)}
                  title="Remove item"
                  style={{
                    background: 'var(--bg)',
                    border: '1px solid var(--line)',
                    borderRadius: 10,
                    width: 36,
                    height: 36,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--mute)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    flexShrink: 0
                  }}
                >
                  <IconTrash size={16} />
                </button>
              </div>
            ))}
          </div>

          <div style={{marginTop: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <Link href="/shop" style={{color: 'var(--blue)', fontWeight: 700, fontSize: '0.88rem', textDecoration: 'none'}}>
              &larr; Continue Shopping
            </Link>
          </div>
        </div>

        {/* Right Side: Order Summary Card */}
        <aside style={{background: '#fff', padding: 24, borderRadius: 20, border: '1px solid var(--line)', boxShadow: '0 4px 20px rgba(0,0,0,0.02)'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18, paddingBottom: 14, borderBottom: '1px solid var(--line)'}}>
            <div style={{width: 36, height: 36, borderRadius: 10, background: 'rgba(36,60,143,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
              <IconClipboard size={18} color="var(--blue)" />
            </div>
            <h2 style={{fontSize: '1.15rem', fontWeight: 800, margin: 0}}>Order Summary</h2>
          </div>

          {/* Clean Gift Packaging Option Card */}
          <label
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              background: giftPackaging ? 'rgba(36, 60, 143, 0.04)' : 'var(--bg)',
              padding: '14px 16px',
              borderRadius: 14,
              border: giftPackaging ? '2px solid var(--blue)' : '1px solid var(--line)',
              marginBottom: 20,
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            <input
              type="checkbox"
              checked={giftPackaging}
              onChange={handleGiftToggle}
              style={{width: 18, height: 18, accentColor: 'var(--blue)', cursor: 'pointer', flexShrink: 0}}
            />
            <div style={{display: 'flex', alignItems: 'center', gap: 10, flex: 1}}>
              <div style={{width: 32, height: 32, borderRadius: 8, background: 'rgba(36,60,143,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
                <IconGift size={16} color="var(--blue)" />
              </div>
              <div>
                <div style={{fontSize: '0.88rem', fontWeight: 700, color: 'var(--ink)'}}>
                  Add Gift Packaging
                </div>
                <div style={{fontSize: '0.78rem', color: 'var(--mute)', marginTop: 2, lineHeight: 1.3}}>
                  +{inr(GIFT_PACKAGING_PER_UNIT)} / product (Occasion wrapping)
                </div>
              </div>
            </div>
          </label>

          {/* Price Breakdown */}
          <div style={{display: 'grid', gap: 10, fontSize: '0.9rem', color: 'var(--ink)'}}>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              <span style={{color: 'var(--mute)'}}>Subtotal ({count} {count === 1 ? 'item' : 'items'})</span>
              <b>{inr(subtotal)}</b>
            </div>

            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              <span style={{color: 'var(--mute)'}}>Delivery Fee (₹30 / prod)</span>
              <b>{inr(deliveryFee)}</b>
            </div>

            {giftPackaging && (
              <div style={{display: 'flex', justifyContent: 'space-between', color: 'var(--blue)'}}>
                <span>Gift Packaging ({inr(GIFT_PACKAGING_PER_UNIT)} / prod)</span>
                <b>+{inr(giftFee)}</b>
              </div>
            )}

            <div style={{display: 'flex', justifyContent: 'space-between', paddingTop: 14, borderTop: '1px solid var(--line)', fontSize: '1.2rem', fontWeight: 800}}>
              <span>Estimated Total</span>
              <span style={{color: 'var(--blue)'}}>{inr(total)}</span>
            </div>
          </div>

          {/* Checkout Button */}
          <Link
            className="btn"
            style={{
              display: 'block',
              textAlign: 'center',
              marginTop: 20,
              padding: '15px',
              borderRadius: 14,
              fontSize: '1.02rem',
              fontWeight: 800,
              textDecoration: 'none',
              boxShadow: '0 8px 24px rgba(36,60,143,0.3)'
            }}
            href="/checkout"
          >
            Proceed to Checkout &rarr;
          </Link>

          {/* Trust Badges */}
          <div style={{marginTop: 20, paddingTop: 16, borderTop: '1px solid var(--line)', display: 'grid', gap: 10, fontSize: '0.8rem', color: 'var(--mute)'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
              <IconShieldCheck size={18} color="var(--blue)" />
              <span><b>100% RBI-Compliant</b> Secure Checkout</span>
            </div>
            <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
              <IconTruck size={18} color="var(--blue)" />
              <span><b>Pan-India Delivery</b> via Premier Logistics</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
