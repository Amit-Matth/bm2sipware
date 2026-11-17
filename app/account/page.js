'use client';

import {useState} from 'react';
import {useRouter} from 'next/navigation';

function IconSearch({size=22, color="var(--blue)"}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
  );
}

function IconPackage({size=22, color="var(--blue)"}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
      <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
      <line x1="12" y1="22.08" x2="12" y2="12"></line>
    </svg>
  );
}

function IconTruck({size=22, color="var(--blue)"}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="3" width="15" height="13"></rect>
      <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
      <circle cx="5.5" cy="18.5" r="2.5"></circle>
      <circle cx="18.5" cy="18.5" r="2.5"></circle>
    </svg>
  );
}

function IconCheckCircle({size=22, color="var(--blue)"}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
  );
}

function IconHeadphones({size=22, color="var(--blue)"}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
      <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
    </svg>
  );
}

export default function Account(){
  const router = useRouter();
  const [n, setN] = useState('');
  const [e, setE] = useState('');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);

  async function go(ev){
    ev.preventDefault();
    setErr('');
    setLoading(true);
    try {
      const res = await fetch('/api/track', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({number: n, email: e})
      });
      const j = await res.json();
      if(res.ok) {
        router.push('/order/' + j.id);
      } else {
        setErr(j.error || 'Order not found. Please check your details.');
      }
    } catch(ex) {
      setErr('Failed to track order. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="wrap" style={{maxWidth: 1050, padding: '36px 16px'}}>
      {/* Header */}
      <div style={{textAlign: 'center', marginBottom: 32}}>
        <h1 style={{fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 800, letterSpacing: '-.03em', marginBottom: 12}}>Track Your Order</h1>
        <p style={{color: 'var(--mute)', fontSize: '0.98rem', maxWidth: 540, margin: '0 auto', lineHeight: 1.5}}>
          Enter your order number and checkout email to view live status updates. No account login needed.
        </p>
      </div>

      {/* Main Tracking Card */}
      <div style={{maxWidth: 600, margin: '0 auto 36px', background: '#fff', padding: '28px 20px', borderRadius: '20px', border: '1px solid var(--line)', boxShadow: '0 10px 30px rgba(0,0,0,0.03)'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20}}>
          <div style={{width: 40, height: 40, borderRadius: 10, background: 'var(--bg)', display: 'grid', placeItems: 'center', border: '1px solid var(--line)'}}>
            <IconSearch size={20} color="var(--blue)" />
          </div>
          <div>
            <h2 style={{fontSize: '1.2rem', fontWeight: 700, margin: 0}}>Order Status Lookup</h2>
            <p style={{fontSize: '0.82rem', color: 'var(--mute)', margin: 0}}>Real-time tracking for BM2 Sipware shipments</p>
          </div>
        </div>

        <form className="form" onSubmit={go} style={{display: 'grid', gap: 14}}>
          <div>
            <label style={{fontSize: '0.85rem', fontWeight: 700, color: 'var(--ink)', marginBottom: 6, display: 'block'}}>Order Number</label>
            <input
              required
              placeholder="e.g. MUG1A2B3C"
              value={n}
              onChange={x => setN(x.target.value)}
              style={{width: '100%', padding: '12px 14px', borderRadius: 10, border: '1px solid var(--line)', background: 'var(--bg)', fontSize: '0.92rem'}}
            />
          </div>

          <div>
            <label style={{fontSize: '0.85rem', fontWeight: 700, color: 'var(--ink)', marginBottom: 6, display: 'block'}}>Email Address</label>
            <input
              required
              type="email"
              placeholder="Email used during checkout"
              value={e}
              onChange={x => setE(x.target.value)}
              style={{width: '100%', padding: '12px 14px', borderRadius: 10, border: '1px solid var(--line)', background: 'var(--bg)', fontSize: '0.92rem'}}
            />
          </div>

          {err && (
            <div style={{background: 'rgba(179, 38, 30, 0.08)', color: '#b3261e', padding: 12, borderRadius: 10, fontSize: '0.88rem', fontWeight: 600, borderLeft: '4px solid #b3261e'}}>
              {err}
            </div>
          )}

          <button className="btn" disabled={loading} style={{width: '100%', padding: '12px', borderRadius: 10, fontSize: '0.95rem', fontWeight: 700, marginTop: 4}}>
            {loading ? 'Searching...' : 'Track Order →'}
          </button>
        </form>

        {/* Helper Tip Box */}
        <div style={{marginTop: 20, background: 'rgba(36, 60, 143, 0.04)', padding: 14, borderRadius: 10, borderLeft: '4px solid var(--blue)', fontSize: '0.82rem', color: 'var(--mute)', lineHeight: 1.5}}>
          💡 <b>Where to find your Order Number:</b> Check your email confirmation inbox or SMS notification sent right after placing your order.
        </div>
      </div>

      {/* 3-Step Journey Timeline */}
      <div style={{background: '#fff', padding: '28px 20px', borderRadius: '20px', border: '1px solid var(--line)', marginBottom: 32, boxShadow: '0 4px 20px rgba(0,0,0,0.02)'}}>
        <div style={{textAlign: 'center', marginBottom: 24}}>
          <h2 style={{fontSize: 'clamp(1.3rem, 4vw, 1.6rem)', fontWeight: 800, marginBottom: 6}}>What Happens Next?</h2>
          <p style={{color: 'var(--mute)', fontSize: '0.88rem'}}>Every order moves through our transparent 3-step fulfillment timeline</p>
        </div>

        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16}}>
          <div style={{background: 'var(--bg)', padding: 20, borderRadius: 14, border: '1px solid var(--line)', textAlign: 'center'}}>
            <div style={{width: 42, height: 42, margin: '0 auto 12px', background: '#fff', borderRadius: 10, display: 'grid', placeItems: 'center', border: '1px solid var(--line)'}}>
              <IconCheckCircle size={20} color="var(--blue)" />
            </div>
            <small style={{color: 'var(--mute)', textTransform: 'uppercase', letterSpacing: '.05em', fontWeight: 700}}>Step 1</small>
            <h3 style={{fontSize: '1.05rem', fontWeight: 700, margin: '4px 0'}}>Order Placed</h3>
            <p style={{fontSize: '0.85rem', color: 'var(--mute)', lineHeight: 1.4, margin: 0}}>Order received and verified for print production.</p>
          </div>

          <div style={{background: 'var(--bg)', padding: 20, borderRadius: 14, border: '1px solid var(--line)', textAlign: 'center'}}>
            <div style={{width: 42, height: 42, margin: '0 auto 12px', background: '#fff', borderRadius: 10, display: 'grid', placeItems: 'center', border: '1px solid var(--line)'}}>
              <IconPackage size={20} color="var(--blue)" />
            </div>
            <small style={{color: 'var(--mute)', textTransform: 'uppercase', letterSpacing: '.05em', fontWeight: 700}}>Step 2</small>
            <h3 style={{fontSize: '1.05rem', fontWeight: 700, margin: '4px 0'}}>Small-Batch Printing</h3>
            <p style={{fontSize: '0.85rem', color: 'var(--mute)', lineHeight: 1.4, margin: 0}}>HD sublimation print &amp; quality check (1-5 days).</p>
          </div>

          <div style={{background: 'var(--bg)', padding: 20, borderRadius: 14, border: '1px solid var(--line)', textAlign: 'center'}}>
            <div style={{width: 42, height: 42, margin: '0 auto 12px', background: '#fff', borderRadius: 10, display: 'grid', placeItems: 'center', border: '1px solid var(--line)'}}>
              <IconTruck size={20} color="var(--blue)" />
            </div>
            <small style={{color: 'var(--mute)', textTransform: 'uppercase', letterSpacing: '.05em', fontWeight: 700}}>Step 3</small>
            <h3 style={{fontSize: '1.05rem', fontWeight: 700, margin: '4px 0'}}>Dispatched &amp; Delivered</h3>
            <p style={{fontSize: '0.85rem', color: 'var(--mute)', lineHeight: 1.4, margin: 0}}>Courier pickup with live tracking to your door (2-9 days).</p>
          </div>
        </div>
      </div>

      {/* Support Box */}
      <div style={{background: '#fff', padding: '24px 20px', borderRadius: '20px', border: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, boxShadow: '0 4px 20px rgba(0,0,0,0.02)'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
          <div style={{width: 40, height: 40, borderRadius: 10, background: 'var(--bg)', display: 'grid', placeItems: 'center', border: '1px solid var(--line)', flexShrink: 0}}>
            <IconHeadphones size={20} color="var(--blue)" />
          </div>
          <div>
            <h3 style={{fontSize: '1.05rem', fontWeight: 700, margin: 0}}>Need Help Finding Your Order?</h3>
            <p style={{fontSize: '0.85rem', color: 'var(--mute)', margin: '2px 0 0'}}>Email support at <b>support@bm2group.in</b></p>
          </div>
        </div>
        <a href="/contact" style={{background: 'var(--blue)', color: '#fff', padding: '10px 20px', borderRadius: 10, fontSize: '0.85rem', fontWeight: 700, textDecoration: 'none'}}>
          Visit Contact Page &rarr;
        </a>
      </div>
    </div>
  );
}
