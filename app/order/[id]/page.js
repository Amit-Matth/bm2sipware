import {one, inr} from '@/lib/db';
import {notFound} from 'next/navigation';
import {Img} from '@/components/ProductCard';

export const dynamic = 'force-dynamic';

function IconCheckCircle({size=44, color="#2e7d32"}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{margin: '0 auto 12px', display: 'block'}}>
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
  );
}

function IconAlertTriangle({size=44, color="#d93838"}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{margin: '0 auto 12px', display: 'block'}}>
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
      <line x1="12" y1="9" x2="12" y2="13"></line>
      <line x1="12" y1="17" x2="12.01" y2="17"></line>
    </svg>
  );
}

function IconCreditCard({size=18, color="var(--blue)"}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
      <line x1="1" y1="10" x2="23" y2="10"></line>
    </svg>
  );
}

function IconMapPin({size=18, color="var(--blue)"}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
      <circle cx="12" cy="10" r="3"></circle>
    </svg>
  );
}

function IconPhone({size=15, color="var(--blue)"}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
    </svg>
  );
}

export default async function Order({params}) {
  const o = await one('orders', {id: params.id});
  if (!o) notFound();

  const isFailed = o.payment_status === 'failed';
  const isPaid = o.payment_status === 'paid' || o.payment_mode === 'cod';

  const statuses = ['placed', 'processing', 'shipped', 'delivered'];
  const currentStatusIdx = statuses.indexOf(o.status) !== -1 ? statuses.indexOf(o.status) : 0;

  return (
    <div className="wrap" style={{padding: '48px 16px', maxWidth: 800}}>
      {/* Header Banner */}
      <div style={{background: isFailed ? '#fdf4f4' : 'var(--sage)', border: `1px solid ${isFailed ? '#f5c6cb' : 'var(--line)'}`, borderRadius: 20, padding: '28px 24px', marginBottom: 28, textAlign: 'center'}}>
        {isFailed ? <IconAlertTriangle /> : <IconCheckCircle />}
        <h1 style={{fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', fontWeight: 800, marginBottom: 8, color: isFailed ? '#d93838' : 'var(--ink)'}}>
          {isFailed ? 'Payment Failed' : 'Order Confirmed!'}
        </h1>
        <p style={{color: 'var(--mute)', fontSize: '1rem'}}>
          Order reference: <b>{o.number}</b> {!isFailed && `· A confirmation copy has been sent to ${o.email}.`}
        </p>
      </div>

      {/* Order Progress Steps Timeline */}
      {!isFailed && (
        <div className="box" style={{padding: 24, marginBottom: 28}}>
          <h3 style={{marginBottom: 20, fontSize: '1.1rem'}}>Order Fulfillment Progress</h3>
          <div style={{display: 'flex', justifyContent: 'space-between', position: 'relative', gap: 8, padding: '0 12px'}}>
            {/* Background Track Line */}
            <div style={{position: 'absolute', top: 16, left: 40, right: 40, height: 3, background: '#e2e8f0', zIndex: 0}} />
            {/* Active Progress Line */}
            <div style={{position: 'absolute', top: 16, left: 40, width: `${(Math.max(0, currentStatusIdx) / 3) * 100}%`, maxWidth: 'calc(100% - 80px)', height: 3, background: 'var(--blue)', transition: 'width 0.4s ease', zIndex: 0}} />

            {['Placed', 'Processing', 'Shipped', 'Delivered'].map((step, idx) => {
              const active = idx <= currentStatusIdx;
              return (
                <div key={step} style={{flex: 1, textAlign: 'center', position: 'relative', zIndex: 1}}>
                  <div style={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    background: active ? 'var(--blue)' : '#fff',
                    border: active ? 'none' : '2px solid #cbd5e1',
                    color: active ? '#fff' : 'var(--mute)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    margin: '0 auto 8px',
                    fontSize: '0.85rem'
                  }}>
                    {idx + 1}
                  </div>
                  <span style={{fontSize: '0.8rem', fontWeight: 600, color: active ? 'var(--ink)' : 'var(--mute)'}}>{step}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Order Items List */}
      <div className="box" style={{padding: 24, marginBottom: 28}}>
        <h3 style={{marginBottom: 16, fontSize: '1.1rem'}}>Ordered Items</h3>
        <div style={{display: 'grid', gap: 16}}>
          {(o.items || []).map(i => (
            <div key={i.id || i.slug} style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, paddingBottom: 16, borderBottom: '1px solid var(--line)'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
                <Img
                  src={i.image || 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=120'}
                  alt={i.name}
                  style={{width: 56, height: 56, objectFit: 'cover', borderRadius: 10, background: '#eee'}}
                />
                <div>
                  <h4 style={{fontSize: '0.95rem', fontWeight: 700, marginBottom: 4}}>{i.name}</h4>
                  <span style={{fontSize: '0.85rem', color: 'var(--mute)'}}>Qty: {i.qty}</span>
                </div>
              </div>
              <div style={{fontWeight: 700, fontSize: '0.95rem'}}>
                {inr(i.price * i.qty)}
              </div>
            </div>
          ))}
        </div>

        {/* Pricing Breakdown */}
        <div style={{marginTop: 20, paddingTop: 16, borderTop: '1px solid var(--line)', display: 'grid', gap: 8, fontSize: '0.9rem'}}>
          <div className="line"><span>Subtotal</span><span>{inr(o.subtotal || 0)}</span></div>
          {o.discount > 0 && <div className="line"><span>Discount</span><span style={{color: 'var(--blue)'}}>−{inr(o.discount)}</span></div>}
          <div className="line"><span>Delivery Fee</span><span>{inr(o.delivery_fee || 0)}</span></div>
          {o.handling_fee > 0 && <div className="line"><span>Handling Charge ({o.payment_mode === 'cod' ? 'COD' : 'Prepaid'})</span><span>{inr(o.handling_fee)}</span></div>}
          {o.gift_packaging && <div className="line"><span>Gift Packaging</span><span>{inr(o.gift_fee || 0)}</span></div>}
          <div className="line tot" style={{fontSize: '1.2rem', marginTop: 8, paddingTop: 12, borderTop: '1px solid var(--line)', fontWeight: 800}}>
            <span>Total Paid</span>
            <span>{inr(o.total)}</span>
          </div>
        </div>
      </div>

      {/* Payment & Shipping Info Cards Grid */}
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20}}>
        <div className="box" style={{padding: 20}}>
          <h4 style={{fontSize: '0.95rem', fontWeight: 700, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8}}>
            <IconCreditCard /> Payment Details
          </h4>
          <p style={{fontSize: '0.9rem', color: 'var(--mute)', marginBottom: 4}}>
            <b>Mode:</b> {o.payment_mode === 'cod' ? 'Cash on Delivery (COD)' : 'Prepaid Online'}
          </p>
          <p style={{fontSize: '0.9rem', color: 'var(--mute)'}}>
            <b>Status:</b> <span style={{color: isPaid ? '#2e7d32' : '#d93838', fontWeight: 600}}>{o.payment_status}</span>
          </p>
        </div>

        <div className="box" style={{padding: 20}}>
          <h4 style={{fontSize: '0.95rem', fontWeight: 700, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8}}>
            <IconMapPin /> Shipping Address
          </h4>
          <p style={{fontSize: '0.9rem', color: 'var(--mute)', lineHeight: 1.5}}>
            <b>{o.address?.first_name || o.name}</b><br/>
            {o.address?.line1}{o.address?.line2 ? `, ${o.address.line2}` : ''}<br/>
            {o.address?.city}, {o.address?.state} — {o.address?.pincode}<br/>
            <span style={{display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 4}}>
              <IconPhone /> {o.phone}
            </span>
          </p>
        </div>
      </div>

      {/* Tracking info if available */}
      {o.tracking_url && (
        <div style={{marginTop: 24, textAlign: 'center'}}>
          <a href={o.tracking_url} target="_blank" rel="noreferrer" className="btn" style={{display: 'inline-block', padding: '12px 28px', textDecoration: 'none'}}>
            Track Shipment ↗
          </a>
        </div>
      )}
    </div>
  );
}
