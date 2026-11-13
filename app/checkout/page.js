'use client';

import {useState, useEffect} from 'react';
import {useRouter} from 'next/navigation';
import Script from 'next/script';
import {useCart} from '@/components/CartProvider';
import {
  inr,
  calcDeliveryFee,
  calcHandlingFee,
  calcGiftFee,
  HANDLING_FEE_PER_UNIT,
  GIFT_PACKAGING_PER_UNIT
} from '@/lib/format';

// Predefined list of Indian States
const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry'
];

// Predefined list of popular Indian Cities
const POPULAR_CITIES = [
  'Mumbai', 'Delhi', 'Bengaluru', 'Hyderabad', 'Ahmedabad', 'Chennai', 'Kolkata',
  'Surat', 'Pune', 'Jaipur', 'Lucknow', 'Kanpur', 'Nagpur', 'Indore', 'Thane',
  'Bhopal', 'Visakhapatnam', 'Patna', 'Vadodara', 'Ghaziabad', 'Ludhiana', 'Agra',
  'Nashik', 'Faridabad', 'Meerut', 'Rajkot', 'Varanasi', 'Srinagar', 'Aurangabad',
  'Dhanbad', 'Amritsar', 'Navi Mumbai', 'Allahabad (Prayagraj)', 'Ranchi', 'Howrah',
  'Coimbatore', 'Jabalpur', 'Gwalior', 'Vijayawada', 'Jodhpur', 'Madurai', 'Raipur',
  'Kota', 'Guwahati', 'Chandigarh', 'Solapur', 'Hubballi-Dharwad', 'Bareilly',
  'Moradabad', 'Mysuru', 'Gurugram', 'Noida', 'Dehradun', 'Shimla', 'Kochi'
];

// Clean SVG Icons
function IconGift({size = 20, color = 'var(--blue)'}) {
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

function IconCreditCard({size = 20, color = 'var(--blue)'}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
      <line x1="1" y1="10" x2="23" y2="10"></line>
    </svg>
  );
}

function IconCash({size = 20, color = 'var(--blue)'}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="6" width="20" height="12" rx="2"></rect>
      <circle cx="12" cy="12" r="2"></circle>
      <path d="M6 12h.01M18 12h.01"></path>
    </svg>
  );
}

function IconShieldCheck({size = 18, color = 'var(--blue)'}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
      <polyline points="9 12 11 14 15 10"></polyline>
    </svg>
  );
}

function IconTag({size = 18, color = 'var(--mute)'}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
      <line x1="7" y1="7" x2="7.01" y2="7"></line>
    </svg>
  );
}

export default function Checkout() {
  const {items, subtotal, count, clear} = useCart();
  const r = useRouter();
  const [f, setF] = useState({name: '', email: '', phone: '', line1: '', line2: '', city: '', state: '', pincode: ''});
  const [mode, setMode] = useState('online'); // 'online' | 'cod'
  const [giftPackaging, setGiftPackaging] = useState(false);
  const [code, setCode] = useState('');
  const [disc, setDisc] = useState(0);
  const [msg, setMsg] = useState('');
  const [busy, setBusy] = useState(false);
  const [redirecting, setRedirecting] = useState(false);

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

  const set = k => e => setF({...f, [k]: e.target.value});

  const deliveryFee = calcDeliveryFee(count);
  const handlingFee = calcHandlingFee(count, mode);
  const giftFee = calcGiftFee(count, giftPackaging);
  const total = Math.max(0, subtotal - disc + deliveryFee + handlingFee + giftFee);

  async function apply() {
    if (!code.trim()) return;
    try {
      const res = await fetch('/api/coupons', {method: 'POST', body: JSON.stringify({code, subtotal})});
      const j = await res.json();
      setDisc(j.discount || 0);
      setMsg(j.error || `Coupon applied: ${inr(j.discount)} off`);
    } catch {
      setMsg('Could not apply coupon');
    }
  }

  async function place(e) {
    e.preventDefault();
    setBusy(true);
    setMsg('');

    const formattedPhone = f.phone.startsWith('+91') ? f.phone : `+91${f.phone}`;

    try {
      const res = await fetch('/api/orders/create', {
        method: 'POST',
        body: JSON.stringify({
          customer: {name: f.name, email: f.email, phone: formattedPhone},
          address: {line1: f.line1, line2: f.line2, city: f.city, state: f.state, pincode: f.pincode},
          items: items.map(i => ({id: i.id, qty: i.qty})),
          coupon: disc ? code : '',
          mode,
          giftPackaging
        })
      });

      const j = await res.json();
      if (!res.ok) {
        setMsg(j.error || 'Could not place order');
        setBusy(false);
        return;
      }

      const done = () => {
        setRedirecting(true);
        clear();
        try { localStorage.removeItem('giftPackaging'); } catch {}
        r.push(`/order/${j.id}`);
      };

      if (mode === 'cod') return done();

      new window.Razorpay({
        key: j.key,
        amount: j.amount,
        currency: 'INR',
        order_id: j.razorpay_order_id,
        name: 'BM2 Sipware',
        prefill: {name: f.name, email: f.email, contact: formattedPhone},
        handler: async p => {
          const v = await fetch('/api/orders/verify', {method: 'POST', body: JSON.stringify({id: j.id, ...p})});
          v.ok ? done() : (setMsg('Payment verification failed. If money was deducted, contact us with order ' + j.number), setBusy(false));
        },
        modal: {ondismiss: () => setBusy(false)}
      }).open();

    } catch (err) {
      setMsg('Failed to process request: ' + err.message);
      setBusy(false);
    }
  }

  if (redirecting) {
    return (
      <div className="wrap" style={{padding: '100px 16px', textAlign: 'center'}}>
        <div style={{width: 56, height: 56, border: '4px solid var(--line)', borderTopColor: 'var(--blue)', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 24px'}} />
        <h2 style={{fontSize: '1.8rem', fontWeight: 800, marginBottom: 8}}>Payment Successful!</h2>
        <p style={{color: 'var(--mute)'}}>Generating order confirmation and syncing fulfillment…</p>
        <style jsx>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className="wrap" style={{padding: '64px 16px', textAlign: 'center', maxWidth: 600}}>
        <h1 style={{fontSize: 'clamp(1.6rem, 5vw, 2.2rem)', fontWeight: 800, marginBottom: 12}}>Your cart is empty</h1>
        <p style={{color: 'var(--mute)', marginBottom: 24}}>Explore our original art mugs &amp; custom drinkware collection.</p>
        <button className="btn" onClick={() => r.push('/shop')}>Browse Products &rarr;</button>
      </div>
    );
  }

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />

      {busy && (
        <div style={{position: 'fixed', inset: 0, background: 'rgba(255,255,255,0.92)', zIndex: 9999, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, textAlign: 'center', padding: 20}}>
          <div style={{width: 56, height: 56, border: '4px solid var(--line)', borderTopColor: 'var(--blue)', borderRadius: '50%', animation: 'spin 1s linear infinite'}} />
          <h3 style={{fontSize: '1.4rem', fontWeight: 800}}>Processing your order &amp; payment…</h3>
          <p style={{color: 'var(--mute)', maxWidth: 360, lineHeight: 1.5}}>Please do not refresh or close this window while we secure your order.</p>
          <style jsx>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      )}

      {/* Datalists for City & State Autocomplete */}
      <datalist id="indian-cities">
        {POPULAR_CITIES.map(c => <option key={c} value={c} />)}
      </datalist>
      <datalist id="indian-states">
        {INDIAN_STATES.map(s => <option key={s} value={s} />)}
      </datalist>

      <div className="wrap checkout-container" style={{padding: '36px 16px 64px 16px'}}>

        {/* Page Title Header */}
        <div style={{marginBottom: 28}}>
          <h1 style={{fontSize: 'clamp(1.8rem, 5vw, 2.4rem)', fontWeight: 800, marginBottom: 6}}>Checkout</h1>
          <p style={{color: 'var(--mute)', fontSize: '0.95rem'}}>Fast checkout &bull; Instant dispatch across India</p>
        </div>

        {/* 2-Column Responsive Equal-Height Layout */}
        <form onSubmit={place} className="two" style={{alignItems: 'stretch'}}>

          {/* LEFT COLUMN: Address Form + Payment Method Options */}
          <div style={{display: 'flex', flexDirection: 'column', gap: 20}}>

            {/* Contact & Shipping Address Card */}
            <div className="box" style={{border: '1px solid var(--line)'}}>
              <h3 style={{fontSize: '1.15rem', fontWeight: 800, marginBottom: 18}}>
                Contact &amp; Shipping Address
              </h3>

              <div className="form">
                <input
                  required
                  placeholder="Full name"
                  value={f.name}
                  onChange={set('name')}
                />

                <div className="f2">
                  <input
                    required
                    type="email"
                    placeholder="Email address"
                    value={f.email}
                    onChange={set('email')}
                  />

                  {/* Mobile Input with fixed +91 prefix */}
                  <div style={{display: 'flex', alignItems: 'center', border: '1px solid var(--line)', borderRadius: 12, background: '#fff', overflow: 'hidden'}}>
                    <span style={{padding: '0 12px', background: 'var(--bg)', borderRight: '1px solid var(--line)', fontWeight: 700, fontSize: '0.9rem', color: 'var(--ink)', height: 46, display: 'flex', alignItems: 'center', flexShrink: 0}}>
                      +91
                    </span>
                    <input
                      required
                      type="tel"
                      pattern="[0-9]{10}"
                      maxLength={10}
                      placeholder="Mobile (10 digits)"
                      value={f.phone}
                      onChange={e => setF({...f, phone: e.target.value.replace(/\D/g, '').slice(0, 10)})}
                      style={{border: 'none', borderRadius: 0, outline: 'none', flex: 1, padding: '12px 14px'}}
                    />
                  </div>
                </div>

                <input
                  required
                  placeholder="Address line 1 (House No, Building, Street)"
                  value={f.line1}
                  onChange={set('line1')}
                />

                <input
                  placeholder="Address line 2 (Area, Landmark - optional)"
                  value={f.line2}
                  onChange={set('line2')}
                />

                {/* City and State Autocomplete */}
                <div className="f2">
                  <input
                    required
                    list="indian-cities"
                    placeholder="City"
                    value={f.city}
                    onChange={set('city')}
                  />

                  <input
                    required
                    list="indian-states"
                    placeholder="State"
                    value={f.state}
                    onChange={set('state')}
                  />
                </div>

                <input
                  required
                  pattern="[0-9]{6}"
                  maxLength={6}
                  placeholder="Pincode (6 digits)"
                  value={f.pincode}
                  onChange={e => setF({...f, pincode: e.target.value.replace(/\D/g, '').slice(0, 6)})}
                />
              </div>
            </div>

            {/* Payment Method Option Selector (Under Address in Left Column) */}
            <div className="box" style={{border: '1px solid var(--line)', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
              <h3 style={{fontSize: '1.15rem', fontWeight: 800, marginBottom: 16}}>
                Payment Method
              </h3>

              <div style={{display: 'grid', gap: 10}}>

                {/* Prepaid Option */}
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '14px',
                    border: mode === 'online' ? '2px solid var(--blue)' : '1px solid var(--line)',
                    borderRadius: 14,
                    background: mode === 'online' ? 'rgba(36, 60, 143, 0.04)' : '#fff',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <input
                    type="radio"
                    name="paymentMode"
                    checked={mode === 'online'}
                    onChange={() => setMode('online')}
                    style={{width: 18, height: 18, accentColor: 'var(--blue)', cursor: 'pointer', flexShrink: 0}}
                  />
                  <div style={{width: 36, height: 36, borderRadius: 10, background: 'rgba(36, 60, 143, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
                    <IconCreditCard size={18} color="var(--blue)" />
                  </div>
                  <div style={{flex: 1}}>
                    <div style={{fontWeight: 700, fontSize: '0.92rem', color: 'var(--ink)'}}>
                      Pay Online (Prepaid)
                    </div>
                    <div style={{fontSize: '0.8rem', color: 'var(--mute)', lineHeight: 1.3, marginTop: 2}}>
                      UPI, Cards, Netbanking &mdash; <b style={{color: 'var(--blue)'}}>FREE (₹0) Handling</b>
                    </div>
                  </div>
                </label>

                {/* COD Option */}
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '14px',
                    border: mode === 'cod' ? '2px solid var(--blue)' : '1px solid var(--line)',
                    borderRadius: 14,
                    background: mode === 'cod' ? 'rgba(36, 60, 143, 0.04)' : '#fff',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <input
                    type="radio"
                    name="paymentMode"
                    checked={mode === 'cod'}
                    onChange={() => setMode('cod')}
                    style={{width: 18, height: 18, accentColor: 'var(--blue)', cursor: 'pointer', flexShrink: 0}}
                  />
                  <div style={{width: 36, height: 36, borderRadius: 10, background: 'rgba(36, 60, 143, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
                    <IconCash size={18} color="var(--blue)" />
                  </div>
                  <div style={{flex: 1}}>
                    <div style={{fontWeight: 700, fontSize: '0.92rem', color: 'var(--ink)'}}>
                      Cash on Delivery (COD)
                    </div>
                    <div style={{fontSize: '0.8rem', color: 'var(--mute)', lineHeight: 1.3, marginTop: 2}}>
                      Handling Charge: <b>{inr(calcHandlingFee(count, 'cod'))}</b> ({inr(HANDLING_FEE_PER_UNIT)} / prod)
                    </div>
                  </div>
                </label>

              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Packaging, Order Summary & Pay CTA Button */}
          <div style={{display: 'flex', flexDirection: 'column', gap: 20}}>

            {/* Packaging Preference Card (Top Right) */}
            <div className="box" style={{border: '1px solid var(--line)'}}>
              <h3 style={{fontSize: '1.15rem', fontWeight: 800, marginBottom: 14}}>
                Packaging Preference
              </h3>

              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '14px 16px',
                  border: giftPackaging ? '2px solid var(--blue)' : '1px solid var(--line)',
                  borderRadius: 14,
                  background: giftPackaging ? 'rgba(36, 60, 143, 0.04)' : '#fff',
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
                  <div style={{width: 36, height: 36, borderRadius: 10, background: 'rgba(36,60,143,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
                    <IconGift size={18} color="var(--blue)" />
                  </div>
                  <div>
                    <div style={{fontWeight: 700, fontSize: '0.92rem', color: 'var(--ink)'}}>
                      Custom Gift Packaging (+{inr(GIFT_PACKAGING_PER_UNIT)} / product)
                    </div>
                    <div style={{fontSize: '0.8rem', color: 'var(--mute)', lineHeight: 1.3, marginTop: 2}}>
                      Individually wrapped in vibrant festival gift paper.
                    </div>
                  </div>
                </div>
              </label>
            </div>

            {/* Order Summary Card + Action CTA (Bottom Right) */}
            <div className="box" style={{border: '1px solid var(--line)', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
              <div>
                <h3 style={{fontSize: '1.15rem', fontWeight: 800, marginBottom: 16}}>
                  Order Summary
                </h3>

                {/* Cart Items List */}
                <div style={{display: 'grid', gap: 10, marginBottom: 16}}>
                  {items.map(i => (
                    <div
                      key={i.cartKey || i.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 10,
                        padding: '10px 12px',
                        background: 'var(--bg)',
                        borderRadius: 12,
                        border: '1px solid var(--line)',
                        width: '100%',
                        minWidth: 0,
                        boxSizing: 'border-box'
                      }}
                    >
                      <div style={{display: 'flex', alignItems: 'center', gap: 10, minWidth: 0, flex: 1}}>
                        {i.image && (
                          <img
                            src={i.image}
                            alt={i.name}
                            style={{width: 40, height: 40, objectFit: 'cover', borderRadius: 8, flexShrink: 0}}
                          />
                        )}
                        <div style={{minWidth: 0, flex: 1}}>
                          <div
                            style={{
                              fontWeight: 700,
                              fontSize: '0.86rem',
                              color: 'var(--ink)',
                              textOverflow: 'ellipsis',
                              overflow: 'hidden',
                              whiteSpace: 'nowrap',
                              width: '100%'
                            }}
                          >
                            {i.name}
                          </div>
                          <div style={{fontSize: '0.78rem', color: 'var(--mute)'}}>
                            Qty: {i.qty}
                          </div>
                        </div>
                      </div>
                      <div style={{fontWeight: 800, fontSize: '0.9rem', color: 'var(--ink)', flexShrink: 0, marginLeft: 4}}>
                        {inr(i.price * i.qty)}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Coupon Code Input */}
                <div style={{display: 'flex', gap: 8, marginBottom: 16, width: '100%', minWidth: 0}}>
                  <div style={{position: 'relative', flex: 1, minWidth: 0}}>
                    <input
                      placeholder="Coupon code (optional)"
                      value={code}
                      onChange={e => setCode(e.target.value.toUpperCase())}
                      style={{paddingLeft: 34, minWidth: 0, width: '100%', fontSize: '0.85rem'}}
                    />
                    <div style={{position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', display: 'flex', alignItems: 'center', pointerEvents: 'none'}}>
                      <IconTag size={16} color="var(--mute)" />
                    </div>
                  </div>
                  <button type="button" className="btn ghost" onClick={apply} style={{padding: '0 16px', borderRadius: 12, fontWeight: 700, fontSize: '0.85rem', flexShrink: 0}}>
                    Apply
                  </button>
                </div>

                {msg && (
                  <div
                    style={{
                      padding: '10px 14px',
                      borderRadius: 10,
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      marginBottom: 14,
                      background: disc ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)',
                      color: disc ? '#059669' : '#DC2626',
                      border: disc ? '1px solid rgba(16,185,129,0.2)' : '1px solid rgba(239,68,68,0.2)'
                    }}
                  >
                    {msg}
                  </div>
                )}

                {/* Price Breakdown */}
                <div style={{display: 'grid', gap: 8, fontSize: '0.88rem', color: 'var(--ink)', borderTop: '1px solid var(--line)', paddingTop: 14}}>
                  <div className="line">
                    <span style={{color: 'var(--mute)'}}>Subtotal ({count} items)</span>
                    <span style={{fontWeight: 600}}>{inr(subtotal)}</span>
                  </div>

                  {disc > 0 && (
                    <div className="line">
                      <span style={{color: 'var(--blue)', fontWeight: 600}}>Coupon Discount</span>
                      <span style={{color: 'var(--blue)', fontWeight: 700}}>−{inr(disc)}</span>
                    </div>
                  )}

                  <div className="line">
                    <span style={{color: 'var(--mute)'}}>Delivery Fee (₹30 / prod)</span>
                    <span style={{fontWeight: 600}}>{inr(deliveryFee)}</span>
                  </div>

                  <div className="line">
                    <span style={{color: 'var(--mute)'}}>Handling Charge</span>
                    <span style={{fontWeight: 600}}>{mode === 'cod' ? inr(handlingFee) : 'FREE (₹0)'}</span>
                  </div>

                  {giftPackaging && (
                    <div className="line">
                      <span style={{color: 'var(--mute)'}}>Gift Packaging ({inr(GIFT_PACKAGING_PER_UNIT)} / prod)</span>
                      <span style={{fontWeight: 600}}>{inr(giftFee)}</span>
                    </div>
                  )}

                  <div
                    className="line tot"
                    style={{
                      fontSize: '1.25rem',
                      fontWeight: 800,
                      color: 'var(--ink)',
                      borderTop: '2px solid var(--line)',
                      marginTop: 6,
                      paddingTop: 10,
                      marginBottom: 16
                    }}
                  >
                    <span>Total Amount</span>
                    <span style={{color: 'var(--blue)'}}>{inr(total)}</span>
                  </div>
                </div>
              </div>

              {/* Submit CTA Button & Security Badge inside Order Summary Card */}
              <div>
                <button
                  type="submit"
                  className="btn"
                  disabled={busy}
                  style={{
                    width: '100%',
                    padding: '16px',
                    fontSize: '1.05rem',
                    fontWeight: 800,
                    borderRadius: 14,
                    boxShadow: '0 6px 20px rgba(36,60,143,0.3)'
                  }}
                >
                  {busy
                    ? 'Processing…'
                    : mode === 'cod'
                    ? `Place COD Order (${inr(total)})`
                    : `Pay ${inr(total)}`}
                </button>

                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 12, fontSize: '0.78rem', color: 'var(--mute)'}}>
                  <IconShieldCheck size={16} color="var(--blue)" />
                  <span>100% RBI-Compliant &amp; Secure Checkout</span>
                </div>
              </div>
            </div>

          </div>

        </form>
      </div>
    </>
  );
}
