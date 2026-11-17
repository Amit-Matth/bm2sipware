"use client";

import {notFound} from 'next/navigation';
import {useState, Fragment} from 'react';

const P={
  cancellation:['Cancellation Policy',['Orders can be cancelled within 2 hours of placing them before printing begins. For Cash on Delivery (COD) orders, please ensure availability to avoid RTO return losses. Prepaid orders receive priority processing and special discounts.']]
};

function IconPackage({size=20, color="currentColor"}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
      <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
      <line x1="12" y1="22.08" x2="12" y2="12"></line>
    </svg>
  );
}

function IconAlertTriangle({size=20, color="currentColor"}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
      <line x1="12" y1="9" x2="12" y2="13"></line>
      <line x1="12" y1="17" x2="12.01" y2="17"></line>
    </svg>
  );
}

function IconClock({size=20, color="currentColor"}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <polyline points="12 6 12 12 16 14"></polyline>
    </svg>
  );
}

function IconClipboard({size=20, color="currentColor"}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
      <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
    </svg>
  );
}

function IconRocket({size=20, color="currentColor"}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path>
      <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path>
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 3 0 3 0z"></path>
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-3 0-3z"></path>
    </svg>
  );
}

function IconScissors({size=20, color="currentColor"}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="6" cy="6" r="3"></circle>
      <circle cx="6" cy="18" r="3"></circle>
      <line x1="20" y1="4" x2="8.12" y2="15.88"></line>
      <line x1="14.47" y1="14.48" x2="20" y2="20"></line>
      <line x1="8.12" y1="8.12" x2="12" y2="12"></line>
    </svg>
  );
}

function IconTruck({size=20, color="currentColor"}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="3" width="15" height="13"></rect>
      <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
      <circle cx="5.5" cy="18.5" r="2.5"></circle>
      <circle cx="18.5" cy="18.5" r="2.5"></circle>
    </svg>
  );
}

function IconSearch({size=20, color="currentColor"}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
  );
}

function IconCheckCircle({size=20, color="currentColor"}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
  );
}

function IconAward({size=20, color="currentColor"}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="7"></circle>
      <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
    </svg>
  );
}

function IconBuilding({size=20, color="currentColor"}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
      <line x1="9" y1="22" x2="9" y2="12"></line>
      <line x1="15" y1="22" x2="15" y2="12"></line>
      <line x1="12" y1="6" x2="12" y2="6.01"></line>
      <line x1="12" y1="10" x2="12" y2="10.01"></line>
      <line x1="8" y1="6" x2="8" y2="6.01"></line>
      <line x1="8" y1="10" x2="8" y2="10.01"></line>
      <line x1="16" y1="6" x2="16" y2="6.01"></line>
      <line x1="16" y1="10" x2="16" y2="10.01"></line>
    </svg>
  );
}

function IconHeadphones({size=20, color="currentColor"}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
      <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
    </svg>
  );
}

export default function Policy({params}){
  const {slug}=params;
  const [openShipping, setOpenShipping] = useState({0: true});
  const toggleShipping = (idx) => setOpenShipping(prev => ({...prev, [idx]: !prev[idx]}));

  if (slug === 'returns') {
    return (
      <div className="wrap" style={{maxWidth: 1050, padding: 'clamp(32px, 5vw, 56px) clamp(12px, 3vw, 20px)'}}>
        <h1 style={{fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', marginBottom: 8}}>Refund &amp; Return Policy</h1>
        <p style={{color: 'var(--mute)', marginBottom: 32}}><b>Last Updated: November 11, 2026</b></p>

        {/* Overview Card */}
        <div style={{background: '#fff', padding: 'clamp(20px, 4vw, 32px)', borderRadius: 'var(--r)', border: '1px solid var(--line)', marginBottom: 24, boxShadow: '0 4px 20px rgba(0,0,0,0.02)', overflow: 'hidden'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16}}>
            <div style={{width: 40, height: 40, minWidth: 40, flexShrink: 0, background: 'var(--bg)', borderRadius: 10, display: 'grid', placeItems: 'center', border: '1px solid var(--line)'}}>
              <IconPackage size={20} color="var(--blue)" />
            </div>
            <h2 style={{fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)', fontWeight: 700, flex: 1, minWidth: 0, wordBreak: 'break-word', lineHeight: 1.3}}>Small-Batch Custom Craftsmanship</h2>
          </div>
          <p style={{lineHeight: 1.7, color: 'var(--ink)'}}>
            At <b>BM2 Sipware</b>, every product is printed on demand with small-batch precision. Because our products are custom-made specifically for your order, <b>we do not offer returns, exchanges, or refunds for change of mind or incorrect item selection.</b>
          </p>
          <div style={{marginTop: 16, background: 'rgba(36, 60, 143, 0.04)', padding: 16, borderRadius: 12, border: '1px solid var(--line)', borderLeft: '4px solid var(--blue)'}}>
            <p style={{lineHeight: 1.7, color: 'var(--blue)', fontWeight: 600}}>
              However, if your order arrives damaged, defective, or gets lost during transit, we are fully committed to making it right.
            </p>
          </div>
        </div>

        {/* Section 1 */}
        <div style={{background: '#fff', padding: 'clamp(20px, 4vw, 32px)', borderRadius: 'var(--r)', border: '1px solid var(--line)', marginBottom: 24, boxShadow: '0 4px 20px rgba(0,0,0,0.02)', overflow: 'hidden'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16}}>
            <div style={{width: 40, height: 40, minWidth: 40, flexShrink: 0, background: 'var(--bg)', borderRadius: 10, display: 'grid', placeItems: 'center', border: '1px solid var(--line)'}}>
              <IconAlertTriangle size={20} color="var(--blue)" />
            </div>
            <h2 style={{fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)', fontWeight: 700, flex: 1, minWidth: 0, wordBreak: 'break-word', lineHeight: 1.3}}>1. Damaged or Defective Products</h2>
          </div>
          <p style={{lineHeight: 1.7, color: 'var(--ink)', marginBottom: 16}}>
            Despite strict quality checks, products can occasionally be damaged in transit due to courier mishandling. If you receive a misprinted, chipped, or damaged item:
          </p>
          <div style={{display: 'grid', gap: 16}}>
            <div style={{background: 'var(--bg)', padding: 18, borderRadius: 12, border: '1px solid var(--line)'}}>
              <h3 style={{fontSize: '1.05rem', fontWeight: 700, color: 'var(--ink)', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap'}}>
                <IconClock size={18} color="var(--blue)" /> Timeframe
              </h3>
              <p style={{fontSize: '0.9rem', color: 'var(--mute)', lineHeight: 1.6}}>You must submit a replacement or refund request within <b>7 days</b> of delivery. Requests submitted after 7 days will incur standard reprinting and reshipping charges.</p>
            </div>
            <div style={{background: 'var(--bg)', padding: 18, borderRadius: 12, border: '1px solid var(--line)'}}>
              <h3 style={{fontSize: '1.05rem', fontWeight: 700, color: 'var(--ink)', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap'}}>
                <IconClipboard size={18} color="var(--blue)" /> Required Proof of Defect
              </h3>
              <p style={{fontSize: '0.9rem', color: 'var(--mute)', lineHeight: 1.6, marginBottom: 8}}>You must provide clear visual evidence to process a claim:</p>
              <ul style={{paddingLeft: 20, lineHeight: 1.7, color: 'var(--ink)', fontSize: '0.9rem'}}>
                <li>An <b>unboxing video</b> showing the unopened package, the shipping label, and the product being removed.</li>
                <li>Clear photos of the damaged/defective product and the original packaging.</li>
              </ul>
              <div style={{marginTop: 10, fontSize: '0.85rem', color: 'var(--mute)', background: '#fff', padding: 10, borderRadius: 8, border: '1px solid var(--line)'}}>
                <i>Note: If an unboxing video is not provided and we cannot independently verify the cause, BM2 Sipware cannot issue a refund or replacement.</i>
              </div>
            </div>
            <div style={{background: 'var(--bg)', padding: 18, borderRadius: 12, border: '1px solid var(--line)'}}>
              <h3 style={{fontSize: '1.05rem', fontWeight: 700, color: 'var(--ink)', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap'}}>
                <IconRocket size={18} color="var(--blue)" /> Resolution
              </h3>
              <ul style={{paddingLeft: 20, lineHeight: 1.7, color: 'var(--ink)', fontSize: '0.9rem'}}>
                <li><b>Replacements:</b> Once approved, a replacement item will be printed and dispatched within <b>2–3 business days</b>.</li>
                <li><b>Refunds:</b> Approved refunds will be processed to your original payment method or issued as store credit within <b>2–3 business days</b>.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section 2 */}
        <div style={{background: '#fff', padding: 'clamp(20px, 4vw, 32px)', borderRadius: 'var(--r)', border: '1px solid var(--line)', marginBottom: 24, boxShadow: '0 4px 20px rgba(0,0,0,0.02)', overflow: 'hidden'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16}}>
            <div style={{width: 40, height: 40, minWidth: 40, flexShrink: 0, background: 'var(--bg)', borderRadius: 10, display: 'grid', placeItems: 'center', border: '1px solid var(--line)'}}>
              <IconScissors size={20} color="var(--blue)" />
            </div>
            <h2 style={{fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)', fontWeight: 700, flex: 1, minWidth: 0, wordBreak: 'break-word', lineHeight: 1.3}}>2. Careful Unboxing Requirement</h2>
          </div>
          <p style={{lineHeight: 1.7, color: 'var(--ink)', marginBottom: 16}}>
            Please handle your parcel with care when opening it. Damages caused by scissors, knives, or sharp instruments during unboxing are not eligible for replacement or refund unless:
          </p>
          <ul style={{paddingLeft: 20, lineHeight: 1.8, color: 'var(--ink)'}}>
            <li>A complete, unedited unboxing video clearly shows the damage occurring prior to opening.</li>
            <li>Photos of the outer courier packaging/cover are provided.</li>
          </ul>
        </div>

        {/* Section 3 */}
        <div style={{background: '#fff', padding: 'clamp(20px, 4vw, 32px)', borderRadius: 'var(--r)', border: '1px solid var(--line)', marginBottom: 24, boxShadow: '0 4px 20px rgba(0,0,0,0.02)', overflow: 'hidden'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16}}>
            <div style={{width: 40, height: 40, minWidth: 40, flexShrink: 0, background: 'var(--bg)', borderRadius: 10, display: 'grid', placeItems: 'center', border: '1px solid var(--line)'}}>
              <IconTruck size={20} color="var(--blue)" />
            </div>
            <h2 style={{fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)', fontWeight: 700, flex: 1, minWidth: 0, wordBreak: 'break-word', lineHeight: 1.3}}>3. Package Damage at Time of Delivery</h2>
          </div>
          <p style={{lineHeight: 1.7, color: 'var(--ink)', marginBottom: 16}}>
            If the parcel appears visibly crushed, torn, or damaged upon delivery:
          </p>
          <ul style={{paddingLeft: 20, lineHeight: 1.8, color: 'var(--ink)'}}>
            <li>Request the courier delivery agent to add a formal remark noting the package damage in their handheld terminal or delivery sheet before signing.</li>
            <li>Take photos of the outer box before opening it to expedite your replacement claim with courier partners.</li>
          </ul>
        </div>

        {/* Section 4 */}
        <div style={{background: '#fff', padding: 'clamp(20px, 4vw, 32px)', borderRadius: 'var(--r)', border: '1px solid var(--line)', marginBottom: 24, boxShadow: '0 4px 20px rgba(0,0,0,0.02)', overflow: 'hidden'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16}}>
            <div style={{width: 40, height: 40, minWidth: 40, flexShrink: 0, background: 'var(--bg)', borderRadius: 10, display: 'grid', placeItems: 'center', border: '1px solid var(--line)'}}>
              <IconClock size={20} color="var(--blue)" />
            </div>
            <h2 style={{fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)', fontWeight: 700, flex: 1, minWidth: 0, wordBreak: 'break-word', lineHeight: 1.3}}>4. Lost in Transit &amp; Shipping Delays</h2>
          </div>
          <div style={{display: 'grid', gap: 16}}>
            <div style={{background: 'var(--bg)', padding: 18, borderRadius: 12, border: '1px solid var(--line)'}}>
              <h3 style={{fontSize: '1.05rem', fontWeight: 700, color: 'var(--ink)', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap'}}>
                <IconPackage size={18} color="var(--blue)" /> A. Lost Shipments
              </h3>
              <p style={{fontSize: '0.9rem', color: 'var(--mute)', lineHeight: 1.6}}>If a package is officially confirmed as &quot;Lost in Transit&quot; by our logistics partners, BM2 Sipware will immediately issue a full replacement or refund.</p>
            </div>
            <div style={{background: 'var(--bg)', padding: 18, borderRadius: 12, border: '1px solid var(--line)'}}>
              <h3 style={{fontSize: '1.05rem', fontWeight: 700, color: 'var(--ink)', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap'}}>
                <IconClock size={18} color="var(--blue)" /> B. Delivery Delays
              </h3>
              <p style={{fontSize: '0.9rem', color: 'var(--mute)', lineHeight: 1.6, marginBottom: 8}}>If a shipment has not had a delivery attempt made within <b>15 days</b> (Air) or <b>20 days</b> (Surface), you may choose to:</p>
              <ol style={{paddingLeft: 20, lineHeight: 1.7, color: 'var(--ink)', fontSize: '0.9rem'}}>
                <li>Have a replacement produced and shipped at no extra charge.</li>
                <li>Receive a full refund for the affected order.</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Section 5: Return & Replacement Workflow */}
        <div style={{background: '#fff', padding: 'clamp(20px, 4vw, 32px)', borderRadius: 'var(--r)', border: '1px solid var(--line)', marginBottom: 24, boxShadow: '0 4px 20px rgba(0,0,0,0.02)', overflow: 'hidden'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16}}>
            <div style={{width: 40, height: 40, minWidth: 40, flexShrink: 0, background: 'var(--bg)', borderRadius: 10, display: 'grid', placeItems: 'center', border: '1px solid var(--line)'}}>
              <IconCheckCircle size={20} color="var(--blue)" />
            </div>
            <h2 style={{fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)', fontWeight: 700, flex: 1, minWidth: 0, wordBreak: 'break-word', lineHeight: 1.3}}>5. Return &amp; Replacement Workflow</h2>
          </div>
          <p style={{lineHeight: 1.7, color: 'var(--ink)', marginBottom: 16}}>
            When a legitimate return or replacement claim is submitted, here is how the process works:
          </p>
          <div style={{display:'grid',gap:8,marginTop:16}}>
            {[
              {step: '01', title: 'Customer Submits Claim', desc: 'Includes video & photo proof within 7 days of delivery.', icon: <IconClipboard size={20} color="var(--blue)" />},
              {step: '02', title: 'Claim Inspection & Approval', desc: 'Reviewed and approved within 24–48 hours by support.', icon: <IconSearch size={20} color="var(--blue)" />},
              {step: '03', title: 'Courier Pickup / Replacement Dispatch', desc: 'Item picked up or fresh print initiated immediately.', icon: <IconTruck size={20} color="var(--blue)" />},
              {step: '04', title: 'Quality Verification', desc: 'Returned item received & checked at our facility.', icon: <IconCheckCircle size={20} color="var(--blue)" />},
              {step: '05', title: 'Resolution Issued', desc: 'Replacement Shipped (2-3 days) OR Refund Granted (2-3 days).', icon: <IconAward size={20} color="var(--blue)" />, highlight: true}
            ].map((s, idx, arr) => (
              <Fragment key={idx}>
                <div style={{
                  background: s.highlight ? 'rgba(36, 60, 143, 0.04)' : 'var(--bg)',
                  border: s.highlight ? '1px solid var(--blue)' : '1px solid var(--line)',
                  borderRadius: 14,
                  padding: 'clamp(14px, 3vw, 20px)',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 16,
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    width: 44,
                    height: 44,
                    minWidth: 44,
                    background: '#fff',
                    borderRadius: 12,
                    display: 'grid',
                    placeItems: 'center',
                    border: '1px solid var(--line)',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
                  }}>
                    {s.icon}
                  </div>
                  <div style={{flex: 1, minWidth: '180px', paddingRight: '56px'}}>
                    <h3 style={{fontSize: '1.05rem', fontWeight: 700, color: 'var(--ink)', marginBottom: 4}}>{s.title}</h3>
                    <p style={{fontSize: '0.9rem', color: s.highlight ? 'var(--blue)' : 'var(--mute)', lineHeight: 1.5, fontWeight: s.highlight ? 600 : 400}}>{s.desc}</p>
                  </div>
                  <span style={{
                    position: 'absolute',
                    top: 14,
                    right: 14,
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: 'var(--mute)',
                    background: '#fff',
                    padding: '2px 8px',
                    borderRadius: 99,
                    border: '1px solid var(--line)'
                  }}>STEP {s.step}</span>
                </div>
                {idx < arr.length - 1 && (
                  <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: 24}}>
                    <div style={{width: 2, height: '100%', background: 'var(--line)', position: 'relative'}}>
                      <div style={{position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: 6, height: 6, borderRadius: '50%', background: 'var(--blue)'}}></div>
                    </div>
                  </div>
                )}
              </Fragment>
            ))}
          </div>
        </div>

        {/* Section 6: Important Return Considerations */}
        <div style={{background: '#fff', padding: 'clamp(20px, 4vw, 32px)', borderRadius: 'var(--r)', border: '1px solid var(--line)', marginBottom: 24, boxShadow: '0 4px 20px rgba(0,0,0,0.02)', overflow: 'hidden'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16}}>
            <div style={{width: 40, height: 40, minWidth: 40, flexShrink: 0, background: 'var(--bg)', borderRadius: 10, display: 'grid', placeItems: 'center', border: '1px solid var(--line)'}}>
              <IconBuilding size={20} color="var(--blue)" />
            </div>
            <h2 style={{fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)', fontWeight: 700, flex: 1, minWidth: 0, wordBreak: 'break-word', lineHeight: 1.3}}>6. Important Return Considerations</h2>
          </div>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16}}>
            <div style={{background: 'var(--bg)', padding: 20, borderRadius: 14, border: '1px solid var(--line)'}}>
              <span style={{fontSize: '0.75rem', fontWeight: 700, color: 'var(--blue)', background: '#fff', padding: '2px 8px', borderRadius: 99, border: '1px solid var(--line)'}}>LOGISTICS POLICY</span>
              <h3 style={{fontSize: '1.05rem', fontWeight: 700, color: 'var(--ink)', margin: '8px 0 6px'}}>Custom Return Address</h3>
              <p style={{fontSize: '0.9rem', color: 'var(--mute)', lineHeight: 1.6}}>All returns are handled directly through our centralized fulfillment infrastructure. Custom or third-party return addresses are not supported by logistics partners.</p>
            </div>
            <div style={{background: 'var(--bg)', padding: 20, borderRadius: 14, border: '1px solid var(--line)'}}>
              <span style={{fontSize: '0.75rem', fontWeight: 700, color: '#b3261e', background: '#fff', padding: '2px 8px', borderRadius: 99, border: '1px solid var(--line)'}}>SHIPPING REQUIREMENT</span>
              <h3 style={{fontSize: '1.05rem', fontWeight: 700, color: 'var(--ink)', margin: '8px 0 6px'}}>Address Accuracy</h3>
              <p style={{fontSize: '0.9rem', color: 'var(--mute)', lineHeight: 1.6}}>Ensure your full shipping address and contact number are accurate at checkout. Packages lost or misdirected due to incorrect buyer address details are not eligible for free reshipping or refunds.</p>
            </div>
          </div>
        </div>

        {/* Section 7: How to File a Claim */}
        <div style={{background: '#fff', padding: 'clamp(20px, 4vw, 32px)', borderRadius: 'var(--r)', border: '1px solid var(--line)', marginBottom: 24, boxShadow: '0 4px 20px rgba(0,0,0,0.02)', overflow: 'hidden'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16}}>
            <div style={{width: 40, height: 40, minWidth: 40, flexShrink: 0, background: 'var(--bg)', borderRadius: 10, display: 'grid', placeItems: 'center', border: '1px solid var(--line)'}}>
              <IconHeadphones size={20} color="var(--blue)" />
            </div>
            <h2 style={{fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)', fontWeight: 700, flex: 1, minWidth: 0, wordBreak: 'break-word', lineHeight: 1.3}}>7. How to File a Claim</h2>
          </div>
          <p style={{lineHeight: 1.7, color: 'var(--ink)', marginBottom: 16}}>
            To report an issue with your order, please contact our support team with your <b>Order ID</b>, <b>Unboxing Video</b>, and <b>Photos</b>:
          </p>
          <div style={{background: 'var(--bg)', padding: 20, borderRadius: 14, border: '1px solid var(--line)', display: 'grid', gap: 10}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--line)', paddingBottom: 8, flexWrap: 'wrap', gap: 8}}>
              <span style={{color: 'var(--mute)'}}>Brand</span>
              <b style={{textAlign: 'right', wordBreak: 'break-word'}}>BM2 Sipware (A Unit of BM2 Group)</b>
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--line)', paddingBottom: 8, flexWrap: 'wrap', gap: 8}}>
              <span style={{color: 'var(--mute)'}}>Support Email</span>
              <a href="mailto:support@bm2group.in" style={{color: 'var(--blue)', fontWeight: 600, wordBreak: 'break-all'}}>support@bm2group.in</a>
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8}}>
              <span style={{color: 'var(--mute)'}}>Help Desk</span>
              <a href="/contact" style={{background: 'var(--blue)', color: '#fff', padding: '6px 14px', borderRadius: 8, fontSize: '0.85rem', fontWeight: 600}}>
                Visit Contact Page &rarr;
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if(slug==='shipping'){
    return (
      <div className="wrap" style={{maxWidth: 1050, padding: '56px 20px'}}>
        <div style={{marginBottom: 36}}>
          <h1 style={{fontSize: '2.4rem', marginBottom: 8}}>Shipping Policy (Logistics)</h1>
          <p style={{color: 'var(--mute)'}}>Trusted national and regional couriers deliver your orders across India with multiple service levels, end-to-end tracking, and COD support.</p>
        </div>

        {/* Packaging Options Section */}
        <div style={{background: '#fff', padding: 32, borderRadius: 'var(--r)', border: '1px solid var(--line)', marginBottom: 24, boxShadow: '0 4px 20px rgba(0,0,0,0.02)', overflow: 'hidden'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20}}>
            <div style={{width: 40, height: 40, minWidth: 40, flexShrink: 0, background: 'var(--bg)', borderRadius: 10, display: 'grid', placeItems: 'center', border: '1px solid var(--line)'}}>
              <IconPackage size={20} color="var(--blue)" />
            </div>
            <h2 style={{fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)', fontWeight: 700, flex: 1, minWidth: 0, wordBreak: 'break-word', lineHeight: 1.3}}>Packaging Options</h2>
          </div>

          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:24}}>
            {/* Default Box Packaging */}
            <div className="addon-card" style={{border: '1px solid var(--line)', borderRadius: 16, overflow: 'hidden', display: 'flex', flexDirection: 'column', background: '#fff'}}>
              <div style={{aspectRatio:'16/10',overflow:'hidden',background:'#fcfcfc',position:'relative'}}>
                <img src="/box-packaging.png" alt="Box Packaging" className="addon-img" style={{width:'100%',height:'100%',objectFit:'contain',padding:24}}/>
                <div style={{position:'absolute',top:16,right:16,background:'var(--blue)',color:'#fff',padding:'6px 14px',borderRadius:99,fontSize:'0.75rem',fontWeight:700,letterSpacing:'.04em'}}>DEFAULT PACKAGING</div>
              </div>
              <div style={{padding:24,flex:1,display:'flex',flexDirection:'column',justifyContent:'space-between'}}>
                <div>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8,flexWrap:'wrap',gap:8}}>
                    <h3 style={{fontSize:'1.3rem',fontWeight:700}}>Box Packaging</h3>
                    <span style={{fontWeight:800,color:'var(--ink)',fontSize:'0.85rem',background:'var(--bg)',padding:'4px 12px',borderRadius:99}}>₹17.7 / product (Included in Price)</span>
                  </div>
                  <p style={{color:'var(--mute)',fontSize:'0.9rem',marginBottom:16,lineHeight:1.6}}>Our default standard packaging. Ensures maximum safety during transit with 3-ply eco-friendly corrugated boxes designed to prevent damage.</p>
                  <ul style={{paddingLeft:18,color:'var(--ink)',fontSize:'0.85rem',lineHeight:1.6,marginBottom:16}}>
                    <li>3-ply sturdy corrugated construction</li>
                    <li>Eco-friendly &amp; sustainable material</li>
                    <li>Volumetric weight boxes (500g, 1000g, 1500g)</li>
                  </ul>
                </div>
                <div style={{background:'rgba(36, 60, 143, 0.04)',padding:12,borderRadius:10,borderLeft:'4px solid var(--blue)'}}>
                  <b style={{display:'block',fontSize:'0.8rem',color:'var(--blue)',marginBottom:2}}>Why box packing?</b>
                  <p style={{fontSize:'0.8rem',color:'var(--mute)',lineHeight:1.4}}>Vital for safe delivery, reduces transit damage, and protects your items.</p>
                </div>
              </div>
            </div>

            {/* Custom Gift Packaging */}
            <div className="addon-card" style={{border: '1px solid var(--line)', borderRadius: 16, overflow: 'hidden', display: 'flex', flexDirection: 'column', background: '#fff'}}>
              <div style={{aspectRatio:'16/10',overflow:'hidden',background:'#fcfcfc',position:'relative'}}>
                <img src="/gift-packaging.png" alt="Gift Packaging" className="addon-img" style={{width:'100%',height:'100%',objectFit:'contain',padding:24}}/>
                <div style={{position:'absolute',top:16,right:16,background:'var(--ink)',color:'#fff',padding:'6px 14px',borderRadius:99,fontSize:'0.75rem',fontWeight:700,letterSpacing:'.04em'}}>CUSTOM UPGRADE</div>
              </div>
              <div style={{padding:24,flex:1,display:'flex',flexDirection:'column',justifyContent:'space-between'}}>
                <div>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8,flexWrap:'wrap',gap:8}}>
                    <h3 style={{fontSize:'1.3rem',fontWeight:700}}>Gift Packaging</h3>
                    <span style={{fontWeight:800,color:'var(--blue)',fontSize:'0.85rem',background:'rgba(36, 60, 143, 0.08)',padding:'4px 12px',borderRadius:99}}>₹47.2 / product (Incl. GST)</span>
                  </div>
                  <p style={{color:'var(--mute)',fontSize:'0.9rem',marginBottom:16,lineHeight:1.6}}>Custom gift wrapping available for an extra charge. Perfect for birthdays, anniversaries, celebrations, and special occasions.</p>
                  <ul style={{paddingLeft:18,color:'var(--ink)',fontSize:'0.85rem',lineHeight:1.6,marginBottom:16}}>
                    <li>Vibrant, premium festival &amp; occasion wrappers</li>
                    <li>Products individually gift-wrapped with care</li>
                    <li>Adds a personal and thoughtful touch</li>
                  </ul>
                </div>
                <div style={{background:'rgba(207, 218, 208, 0.3)',padding:12,borderRadius:10,borderLeft:'4px solid var(--ink)'}}>
                  <b style={{display:'block',fontSize:'0.8rem',color:'var(--ink)',marginBottom:2}}>Why gift packaging?</b>
                  <p style={{fontSize:'0.8rem',color:'var(--mute)',lineHeight:1.4}}>Presents products beautifully, creating an unforgettable unboxing moment.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Shipping Flow Section */}
        <div style={{background:'#fff',padding:32,borderRadius:'var(--r)',border:'1px solid var(--line)',marginBottom:24,boxShadow:'0 4px 20px rgba(0,0,0,0.02)', overflow: 'hidden'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16}}>
            <div style={{width: 40, height: 40, minWidth: 40, flexShrink: 0, background: 'var(--bg)', borderRadius: 10, display: 'grid', placeItems: 'center', border: '1px solid var(--line)'}}>
              <IconTruck size={20} color="var(--blue)" />
            </div>
            <h2 style={{fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)', fontWeight: 700, flex: 1, minWidth: 0, wordBreak: 'break-word', lineHeight: 1.3}}>Shipping Flow</h2>
          </div>
          <p style={{color:'var(--mute)',marginBottom:24}}>Efficient and transparent shipping process to ensure your orders reach you on time.</p>

          <div style={{display:'flex',justifyContent:'center',alignItems:'center',gap:24,flexWrap:'wrap'}}>
            <div style={{flex:1,minWidth:240,background:'var(--bg)',padding:24,borderRadius:16,border:'1px solid var(--line)'}}>
              <div style={{width:48,height:48,marginBottom:16,background:'#fff',borderRadius:12,display:'grid',placeItems:'center',border:'1px solid var(--line)',boxShadow: '0 2px 8px rgba(0,0,0,0.03)'}}>
                <IconClock size={22} color="var(--blue)" />
              </div>
              <small style={{color:'var(--mute)',textTransform:'uppercase',letterSpacing:'.05em',fontWeight:600,display:'block',marginBottom:4}}>Step 1</small>
              <h3 style={{fontSize:'1.2rem',margin:'0 0 6px 0',fontWeight:700}}>Processing</h3>
              <p style={{fontSize:'0.9rem',color:'var(--mute)',lineHeight:1.6,margin:0}}>Orders are processed for shipping within 2-3 days.</p>
            </div>

            <div style={{flex:1,minWidth:240,background:'var(--bg)',padding:24,borderRadius:16,border:'1px solid var(--line)'}}>
              <div style={{width:48,height:48,marginBottom:16,background:'#fff',borderRadius:12,display:'grid',placeItems:'center',border:'1px solid var(--line)',boxShadow: '0 2px 8px rgba(0,0,0,0.03)'}}>
                <IconPackage size={22} color="var(--blue)" />
              </div>
              <small style={{color:'var(--mute)',textTransform:'uppercase',letterSpacing:'.05em',fontWeight:600,display:'block',marginBottom:4}}>Step 2</small>
              <h3 style={{fontSize:'1.2rem',margin:'0 0 6px 0',fontWeight:700}}>Delivery</h3>
              <p style={{fontSize:'0.9rem',color:'var(--mute)',lineHeight:1.6,margin:0}}>Delivery takes 2-5 days, depending on the shipping method &amp; pin code.</p>
            </div>
          </div>
        </div>

        {/* Shipping Partners Section */}
        <div style={{background:'#fff',padding:32,borderRadius:'var(--r)',border:'1px solid var(--line)',marginBottom:24,boxShadow:'0 4px 20px rgba(0,0,0,0.02)', overflow: 'hidden'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16}}>
            <div style={{width: 40, height: 40, minWidth: 40, flexShrink: 0, background: 'var(--bg)', borderRadius: 10, display: 'grid', placeItems: 'center', border: '1px solid var(--line)'}}>
              <IconBuilding size={20} color="var(--blue)" />
            </div>
            <h2 style={{fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)', fontWeight: 700, flex: 1, minWidth: 0, wordBreak: 'break-word', lineHeight: 1.3}}>Shipping Partners</h2>
          </div>
          <p style={{color:'var(--mute)',marginBottom:24}}>Trusted national and regional couriers deliver your orders across India with multiple service levels, end-to-end tracking, and COD support.</p>

          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))',gap:16,alignItems:'center'}}>
            {[
              '/partner-2-c40cda.avif',
              '/partner-3-55fc5e.avif',
              '/partner-1-422cf3.avif',
              '/partner-4.avif',
              '/partner-5.avif',
              '/partner-6.avif'
            ].map((src, idx) => (
              <div key={idx} style={{background:'var(--bg)',padding:'20px 24px',borderRadius:16,border:'1px solid var(--line)',display:'flex',alignItems:'center',justifyContent:'center',aspectRatio:'16/9',overflow:'hidden',boxShadow:'0 2px 8px rgba(0,0,0,0.02)'}}>
                <img src={src} alt={`Shipping Partner ${idx + 1}`} style={{maxWidth:'100%',maxHeight:'100%',objectFit:'contain'}}/>
              </div>
            ))}
          </div>
        </div>

        {/* Single Merged India Post Card */}
        <div style={{background:'#fff',padding:32,borderRadius:'var(--r)',border:'1px solid var(--line)',marginBottom:24,boxShadow:'0 4px 20px rgba(0,0,0,0.02)', overflow: 'hidden'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16}}>
            <div style={{width: 40, height: 40, minWidth: 40, flexShrink: 0, background: 'var(--bg)', borderRadius: 10, display: 'grid', placeItems: 'center', border: '1px solid var(--line)'}}>
              <IconClock size={20} color="var(--blue)" />
            </div>
            <h2 style={{fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)', fontWeight: 700, flex: 1, minWidth: 0, wordBreak: 'break-word', lineHeight: 1.3}}>India Post Shipping &amp; Tracking</h2>
          </div>
          <ul style={{paddingLeft:20,lineHeight:1.8,color:'var(--ink)',display:'grid',gap:10}}>
            <li>We ship through India Post if your pin code isn&apos;t serviced by other couriers.</li>
            <li>India Post delivery timeline varies from <b>3-15 working days</b>.</li>
            <li>India Post courier does not provide end-to-end tracking details.</li>
            <li>You cannot claim for lost/undelivered/POD for India Post orders.</li>
          </ul>
        </div>

        {/* Shipping Status & Tracking Accordion Section */}
        <div style={{background:'#fff',padding:32,borderRadius:'var(--r)',border:'1px solid var(--line)',marginBottom:24,boxShadow:'0 4px 20px rgba(0,0,0,0.02)', overflow: 'hidden'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16}}>
            <div style={{width: 40, height: 40, minWidth: 40, flexShrink: 0, background: 'var(--bg)', borderRadius: 10, display: 'grid', placeItems: 'center', border: '1px solid var(--line)'}}>
              <IconCheckCircle size={20} color="var(--blue)" />
            </div>
            <h2 style={{fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)', fontWeight: 700, flex: 1, minWidth: 0, wordBreak: 'break-word', lineHeight: 1.3}}>Shipping Status</h2>
          </div>
          <p style={{color:'var(--mute)',marginBottom:24}}>After the shipping label is generated, you can track your order from the dashboard. Click on any status below to learn more:</p>

          <div style={{display:'grid',gap:12}}>
            {[
              ['Pickup Scheduled', 'An order for which the Pickup Request has been generated and sent to the courier company is marked with the status \'Pickup Scheduled\'.'],
              ['Pickup error', 'This status indicates that there was an error during the pickup process. The courier company was unable to collect the package from the sender\'s location.'],
              ['Out for Pick Up', 'The courier has been dispatched to collect the package from the sender\'s location. This means the pickup is in progress.'],
              ['Pickup Exception', 'An exception occurred during the pickup process. This could be due to various reasons such as incorrect address, package not ready, or other logistical issues.'],
              ['Pickup Rescheduled', 'The pickup has been rescheduled to a different date or time. This usually happens when the original pickup time was not convenient or there were issues with the initial pickup attempt.'],
              ['Order Picked Up', 'The package has been successfully collected from the sender\'s location by the courier company and is now in their possession.'],
              ['In-transit', 'The package is currently being transported from the pickup location to the destination. It\'s on its way through the courier\'s network.'],
              ['Out for Delivery', 'The package has reached the destination city and is out for final delivery to the recipient\'s address.'],
              ['Undelivered 1st/2nd/3rd Attempt', 'The delivery attempt was unsuccessful. This could be due to recipient not available, incorrect address, or other delivery issues. Multiple attempts will be made before returning the package.'],
              ['Delivered', 'The package has been successfully delivered to the recipient. The delivery process is complete.']
            ].map(([title, desc], idx) => {
              const isOpen = !!openShipping[idx];
              return (
                <div
                  key={title}
                  onClick={() => toggleShipping(idx)}
                  style={{
                    padding: 20,
                    background: isOpen ? '#fff' : 'var(--bg)',
                    borderRadius: 12,
                    border: isOpen ? '1px solid var(--blue)' : '1px solid var(--line)',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                    boxShadow: isOpen ? '0 4px 16px rgba(36,60,143,0.06)' : 'none'
                  }}
                >
                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16}}>
                    <span style={{fontWeight: 700, fontSize: '1.05rem', color: isOpen ? 'var(--blue)' : 'var(--ink)'}}>{title}</span>
                    <div style={{
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s ease',
                      width: 28, height: 28, borderRadius: '50%', background: isOpen ? 'rgba(36,60,143,0.08)' : 'transparent',
                      display: 'grid', placeItems: 'center', color: isOpen ? 'var(--blue)' : 'var(--mute)'
                    }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </div>
                  </div>
                  <div
                    style={{
                      maxHeight: isOpen ? '300px' : '0px',
                      opacity: isOpen ? 1 : 0,
                      marginTop: isOpen ? 12 : 0,
                      overflow: 'hidden',
                      transition: 'max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.35s ease, margin-top 0.3s ease'
                    }}
                  >
                    <p style={{color: 'var(--mute)', lineHeight: 1.6, fontSize: '0.95rem', margin: 0}}>
                      {desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  if (slug === 'privacy') {
    return (
      <div className="wrap" style={{maxWidth: 1050, padding: '56px 20px'}}>
        <h1 style={{fontSize: '2.4rem', marginBottom: 8}}>Privacy Policy</h1>
        <p style={{color: 'var(--mute)', marginBottom: 32}}><b>Last Updated: November 11, 2026</b></p>

        {/* Section 1 */}
        <div style={{background: '#fff', padding: 32, borderRadius: 'var(--r)', border: '1px solid var(--line)', marginBottom: 24, boxShadow: '0 4px 20px rgba(0,0,0,0.02)', overflow: 'hidden'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16}}>
            <div style={{width: 40, height: 40, minWidth: 40, flexShrink: 0, background: 'var(--bg)', borderRadius: 10, display: 'grid', placeItems: 'center', border: '1px solid var(--line)'}}>
              <IconClipboard size={20} color="var(--blue)" />
            </div>
            <h2 style={{fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)', fontWeight: 700, flex: 1, minWidth: 0, wordBreak: 'break-word', lineHeight: 1.3}}>1. Introduction &amp; Overview</h2>
          </div>
          <p style={{lineHeight: 1.7, color: 'var(--ink)'}}>
            Welcome to <b>BM2 Sipware</b> (<a href="https://sipware.bm2group.in" target="_blank" rel="noopener noreferrer" style={{color: 'var(--blue)', fontWeight: 600}}>sipware.bm2group.in</a>), operated under <b>BM2 Group</b> (<a href="https://bm2group.in" target="_blank" rel="noopener noreferrer" style={{color: 'var(--blue)', fontWeight: 600}}>bm2group.in</a>). We respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or purchase our products.
          </p>
        </div>

        {/* Section 2 */}
        <div style={{background: '#fff', padding: 32, borderRadius: 'var(--r)', border: '1px solid var(--line)', marginBottom: 24, boxShadow: '0 4px 20px rgba(0,0,0,0.02)', overflow: 'hidden'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20}}>
            <div style={{width: 40, height: 40, minWidth: 40, flexShrink: 0, background: 'var(--bg)', borderRadius: 10, display: 'grid', placeItems: 'center', border: '1px solid var(--line)'}}>
              <IconBuilding size={20} color="var(--blue)" />
            </div>
            <h2 style={{fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)', fontWeight: 700, flex: 1, minWidth: 0, wordBreak: 'break-word', lineHeight: 1.3}}>2. Information We Collect</h2>
          </div>
          <div style={{display: 'grid', gap: 16}}>
            <div style={{background: 'var(--bg)', padding: 18, borderRadius: 12, border: '1px solid var(--line)'}}>
              <h3 style={{fontSize: '1.05rem', fontWeight: 700, color: 'var(--ink)', marginBottom: 8}}>A. Personal Identification Information</h3>
              <p style={{fontSize: '0.9rem', color: 'var(--mute)', lineHeight: 1.6, margin: 0}}>
                When you create an account, place an order, or contact support, we collect your name, email address, phone number, shipping address, and billing details.
              </p>
            </div>
            <div style={{background: 'var(--bg)', padding: 18, borderRadius: 12, border: '1px solid var(--line)'}}>
              <h3 style={{fontSize: '1.05rem', fontWeight: 700, color: 'var(--ink)', marginBottom: 8}}>B. Transaction &amp; Payment Data</h3>
              <p style={{fontSize: '0.9rem', color: 'var(--mute)', lineHeight: 1.6, margin: 0}}>
                Payment transactions are processed securely through RBI-compliant third-party payment gateways. We do not store your full credit card numbers or UPI banking passwords on our servers.
              </p>
            </div>
            <div style={{background: 'var(--bg)', padding: 18, borderRadius: 12, border: '1px solid var(--line)'}}>
              <h3 style={{fontSize: '1.05rem', fontWeight: 700, color: 'var(--ink)', marginBottom: 8}}>C. Technical &amp; Usage Data</h3>
              <p style={{fontSize: '0.9rem', color: 'var(--mute)', lineHeight: 1.6, margin: 0}}>
                We automatically collect standard browser and device information, IP address, pages visited, and timestamps to optimize platform performance and security.
              </p>
            </div>
          </div>
        </div>

        {/* Section 3 */}
        <div style={{background: '#fff', padding: 32, borderRadius: 'var(--r)', border: '1px solid var(--line)', marginBottom: 24, boxShadow: '0 4px 20px rgba(0,0,0,0.02)', overflow: 'hidden'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16}}>
            <div style={{width: 40, height: 40, minWidth: 40, flexShrink: 0, background: 'var(--bg)', borderRadius: 10, display: 'grid', placeItems: 'center', border: '1px solid var(--line)'}}>
              <IconPackage size={20} color="var(--blue)" />
            </div>
            <h2 style={{fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)', fontWeight: 700, flex: 1, minWidth: 0, wordBreak: 'break-word', lineHeight: 1.3}}>3. How We Use Your Information</h2>
          </div>
          <ul style={{paddingLeft: 20, lineHeight: 1.8, color: 'var(--ink)'}}>
            <li><b>Order Fulfillment:</b> To process, print on demand, package, and ship your ceramic sipware orders via logistics partners.</li>
            <li><b>Customer Support:</b> To respond to inquiries, process replacements or claims, and verify unboxing videos.</li>
            <li><b>Platform Improvements:</b> To analyze site traffic, prevent fraudulent transactions, and enhance user experience.</li>
          </ul>
        </div>

        {/* Section 4 */}
        <div style={{background: '#fff', padding: 32, borderRadius: 'var(--r)', border: '1px solid var(--line)', marginBottom: 24, boxShadow: '0 4px 20px rgba(0,0,0,0.02)', overflow: 'hidden'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16}}>
            <div style={{width: 40, height: 40, minWidth: 40, flexShrink: 0, background: 'var(--bg)', borderRadius: 10, display: 'grid', placeItems: 'center', border: '1px solid var(--line)'}}>
              <IconTruck size={20} color="var(--blue)" />
            </div>
            <h2 style={{fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)', fontWeight: 700, flex: 1, minWidth: 0, wordBreak: 'break-word', lineHeight: 1.3}}>4. Third-Party Fulfillment &amp; Sharing</h2>
          </div>
          <p style={{lineHeight: 1.7, color: 'var(--ink)'}}>
            We share necessary shipping and order details with our print-on-demand fulfillment partners (such as <b>Quikink</b>) and courier delivery services strictly to manufacture and deliver your products. We do not sell, trade, or rent your personal data to external advertisers.
          </p>
        </div>

        {/* Section 5 */}
        <div style={{background: '#fff', padding: 32, borderRadius: 'var(--r)', border: '1px solid var(--line)', marginBottom: 24, boxShadow: '0 4px 20px rgba(0,0,0,0.02)', overflow: 'hidden'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16}}>
            <div style={{width: 40, height: 40, minWidth: 40, flexShrink: 0, background: 'var(--bg)', borderRadius: 10, display: 'grid', placeItems: 'center', border: '1px solid var(--line)'}}>
              <IconCheckCircle size={20} color="var(--blue)" />
            </div>
            <h2 style={{fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)', fontWeight: 700, flex: 1, minWidth: 0, wordBreak: 'break-word', lineHeight: 1.3}}>5. Data Security</h2>
          </div>
          <p style={{lineHeight: 1.7, color: 'var(--ink)'}}>
            We implement robust administrative, technical, and physical security measures to safeguard your personal information against unauthorized access, alteration, disclosure, or destruction.
          </p>
        </div>

        {/* Section 6 */}
        <div style={{background: '#fff', padding: 32, borderRadius: 'var(--r)', border: '1px solid var(--line)', marginBottom: 24, boxShadow: '0 4px 20px rgba(0,0,0,0.02)', overflow: 'hidden'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16}}>
            <div style={{width: 40, height: 40, minWidth: 40, flexShrink: 0, background: 'var(--bg)', borderRadius: 10, display: 'grid', placeItems: 'center', border: '1px solid var(--line)'}}>
              <IconAward size={20} color="var(--blue)" />
            </div>
            <h2 style={{fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)', fontWeight: 700, flex: 1, minWidth: 0, wordBreak: 'break-word', lineHeight: 1.3}}>6. Your Rights &amp; Contact</h2>
          </div>
          <p style={{lineHeight: 1.7, color: 'var(--ink)', marginBottom: 16}}>
            You have the right to request access to, correction of, or deletion of your personal data. For privacy inquiries or support, please reach out to us:
          </p>
          <div style={{background: 'var(--bg)', padding: 20, borderRadius: 14, border: '1px solid var(--line)', display: 'grid', gap: 10}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--line)', paddingBottom: 8, flexWrap: 'wrap', gap: 8}}>
              <span style={{color: 'var(--mute)'}}>Support Email</span>
              <a href="mailto:support@bm2group.in" style={{color: 'var(--blue)', fontWeight: 600, wordBreak: 'break-all'}}>support@bm2group.in</a>
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8}}>
              <span style={{color: 'var(--mute)'}}>Help Desk</span>
              <a href="/contact" style={{background: 'var(--blue)', color: '#fff', padding: '6px 14px', borderRadius: 8, fontSize: '0.85rem', fontWeight: 600}}>
                Visit Contact Page &rarr;
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (slug === 'terms') {
    return (
      <div className="wrap" style={{maxWidth: 1050, padding: '56px 20px'}}>
        <h1 style={{fontSize: '2.4rem', marginBottom: 8}}>Terms of Service</h1>
        <p style={{color: 'var(--mute)', marginBottom: 32}}><b>Last Updated: November 11, 2026</b></p>

        <div style={{background: '#fff', padding: 32, borderRadius: 'var(--r)', border: '1px solid var(--line)', marginBottom: 24, boxShadow: '0 4px 20px rgba(0,0,0,0.02)', overflow: 'hidden'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16}}>
            <div style={{width: 40, height: 40, minWidth: 40, flexShrink: 0, background: 'var(--bg)', borderRadius: 10, display: 'grid', placeItems: 'center', border: '1px solid var(--line)'}}>
              <IconClipboard size={20} color="var(--blue)" />
            </div>
            <h2 style={{fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)', fontWeight: 700, flex: 1, minWidth: 0, wordBreak: 'break-word', lineHeight: 1.3}}>1. Introduction &amp; Acceptance</h2>
          </div>
          <p style={{lineHeight: 1.7, color: 'var(--ink)'}}>
            Welcome to <b>BM2 Sipware</b> (<a href="https://sipware.bm2group.in" target="_blank" rel="noopener noreferrer" style={{color: 'var(--blue)', fontWeight: 600}}>sipware.bm2group.in</a>), an e-commerce brand operating under <b>BM2 Group</b> (<a href="https://bm2group.in" target="_blank" rel="noopener noreferrer" style={{color: 'var(--blue)', fontWeight: 600}}>bm2group.in</a>). These Terms of Service (&quot;Terms&quot;) govern your access to and use of our website, product catalog, customer portal, and order fulfillment services (collectively, the &quot;Services&quot;).
          </p>
          <p style={{lineHeight: 1.7, color: 'var(--ink)', marginTop: 12}}>
            By browsing our website, registering an account, or placing an order, you agree to be bound by these Terms and our Privacy Policy. If you do not agree with any part of these terms, please refrain from using our website or placing orders.
          </p>
        </div>

        <div style={{background: '#fff', padding: 32, borderRadius: 'var(--r)', border: '1px solid var(--line)', marginBottom: 24, boxShadow: '0 4px 20px rgba(0,0,0,0.02)', overflow: 'hidden'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16}}>
            <div style={{width: 40, height: 40, minWidth: 40, flexShrink: 0, background: 'var(--bg)', borderRadius: 10, display: 'grid', placeItems: 'center', border: '1px solid var(--line)'}}>
              <IconBuilding size={20} color="var(--blue)" />
            </div>
            <h2 style={{fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)', fontWeight: 700, flex: 1, minWidth: 0, wordBreak: 'break-word', lineHeight: 1.3}}>2. Brand Ecosystem &amp; Operations</h2>
          </div>
          <p style={{lineHeight: 1.7, color: 'var(--ink)'}}>
            BM2 Sipware operates proudly under the <b>BM2 Group</b> umbrella, guided by our core philosophy to <i>Think Beyond Business</i>.
          </p>
          <p style={{lineHeight: 1.7, color: 'var(--ink)', marginTop: 12}}>
            Our physical sipware products (including ceramic mugs and drinkware) feature original vector illustrations and artwork. Production, printing, and physical fulfillment are executed in partnership with print-on-demand fulfillment providers, including <b>Quikink</b>, to deliver freshly printed, small-batch products with zero inventory waste.
          </p>
        </div>

        <div style={{background: '#fff', padding: 32, borderRadius: 'var(--r)', border: '1px solid var(--line)', marginBottom: 24, boxShadow: '0 4px 20px rgba(0,0,0,0.02)', overflow: 'hidden'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20}}>
            <div style={{width: 40, height: 40, minWidth: 40, flexShrink: 0, background: 'var(--bg)', borderRadius: 10, display: 'grid', placeItems: 'center', border: '1px solid var(--line)'}}>
              <IconHeadphones size={20} color="var(--blue)" />
            </div>
            <h2 style={{fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)', fontWeight: 700, flex: 1, minWidth: 0, wordBreak: 'break-word', lineHeight: 1.3}}>3. Eligibility &amp; Account Responsibilities</h2>
          </div>
          <div style={{display: 'grid', gap: 16}}>
            <div style={{background: 'var(--bg)', padding: 18, borderRadius: 12, border: '1px solid var(--line)'}}>
              <h3 style={{fontSize: '1.05rem', fontWeight: 700, color: 'var(--ink)', marginBottom: 8}}>A. Age &amp; Legal Capacity</h3>
              <ul style={{paddingLeft: 20, lineHeight: 1.8, color: 'var(--ink)', fontSize: '0.9rem', margin: 0}}>
                <li>You must be at least <b>18 years of age</b> to create an account or purchase products independently.</li>
                <li>Individuals between the ages of 13 and 17 may only use our Services under the direct supervision and consent of a parent or legal guardian who agrees to be bound by these Terms.</li>
                <li>Children under the age of 13 are not permitted to use our website or submit personal information.</li>
              </ul>
            </div>
            <div style={{background: 'var(--bg)', padding: 18, borderRadius: 12, border: '1px solid var(--line)'}}>
              <h3 style={{fontSize: '1.05rem', fontWeight: 700, color: 'var(--ink)', marginBottom: 8}}>B. Account Security</h3>
              <p style={{fontSize: '0.9rem', color: 'var(--mute)', lineHeight: 1.6, margin: 0}}>
                When creating an account, you agree to provide accurate, complete, and current information. You are solely responsible for maintaining the confidentiality of your account credentials and password. You agree to notify BM2 Sipware immediately of any unauthorized use or security breach involving your account.
              </p>
            </div>
          </div>
        </div>

        <div style={{background: '#fff', padding: 32, borderRadius: 'var(--r)', border: '1px solid var(--line)', marginBottom: 24, boxShadow: '0 4px 20px rgba(0,0,0,0.02)', overflow: 'hidden'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20}}>
            <div style={{width: 40, height: 40, minWidth: 40, flexShrink: 0, background: 'var(--bg)', borderRadius: 10, display: 'grid', placeItems: 'center', border: '1px solid var(--line)'}}>
              <IconPackage size={20} color="var(--blue)" />
            </div>
            <h2 style={{fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)', fontWeight: 700, flex: 1, minWidth: 0, wordBreak: 'break-word', lineHeight: 1.3}}>4. Product Descriptions, Printing &amp; Color Disclaimer</h2>
          </div>
          <div style={{display: 'grid', gap: 16}}>
            <div style={{background: 'var(--bg)', padding: 18, borderRadius: 12, border: '1px solid var(--line)'}}>
              <h3 style={{fontSize: '1.05rem', fontWeight: 700, color: 'var(--ink)', marginBottom: 8}}>A. Custom Print-on-Demand Process</h3>
              <p style={{fontSize: '0.9rem', color: 'var(--mute)', lineHeight: 1.6, marginBottom: 8}}>
                Each product is printed on demand after an order is placed. While we make every effort to display colors, design placements, and product details with high accuracy:
              </p>
              <ul style={{paddingLeft: 20, lineHeight: 1.7, color: 'var(--ink)', fontSize: '0.9rem', margin: 0}}>
                <li>Slight variations in color shade, print saturation, or visual alignment may occur due to screen display settings and the physical sublimation process on curved ceramic surfaces.</li>
                <li>Product capacity sizes (e.g., standard 11 oz / 325 ml and 25 oz / 750 ml) are approximate standard manufacturing dimensions.</li>
              </ul>
            </div>
            <div style={{background: 'var(--bg)', padding: 18, borderRadius: 12, border: '1px solid var(--line)'}}>
              <h3 style={{fontSize: '1.05rem', fontWeight: 700, color: 'var(--ink)', marginBottom: 8}}>B. Quality &amp; Safety Guarantee</h3>
              <p style={{fontSize: '0.9rem', color: 'var(--mute)', lineHeight: 1.6, margin: 0}}>
                All designs are pre-tested on real ceramic surfaces prior to public release to ensure microwave and dishwasher durability under normal usage conditions.
              </p>
            </div>
          </div>
        </div>

        <div style={{background: '#fff', padding: 32, borderRadius: 'var(--r)', border: '1px solid var(--line)', marginBottom: 24, boxShadow: '0 4px 20px rgba(0,0,0,0.02)', overflow: 'hidden'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16}}>
            <div style={{width: 40, height: 40, minWidth: 40, flexShrink: 0, background: 'var(--bg)', borderRadius: 10, display: 'grid', placeItems: 'center', border: '1px solid var(--line)'}}>
              <IconAward size={20} color="var(--blue)" />
            </div>
            <h2 style={{fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)', fontWeight: 700, flex: 1, minWidth: 0, wordBreak: 'break-word', lineHeight: 1.3}}>5. Pricing, Taxes &amp; Payment Terms</h2>
          </div>
          <ul style={{paddingLeft: 20, lineHeight: 1.8, color: 'var(--ink)'}}>
            <li><b>Pricing:</b> All prices listed on <a href="https://sipware.bm2group.in" target="_blank" rel="noopener noreferrer" style={{color: 'var(--blue)', fontWeight: 600}}>sipware.bm2group.in</a> are displayed in Indian Rupees (INR) and are inclusive or exclusive of applicable Goods and Services Tax (GST) as specified during checkout.</li>
            <li><b>Price Modifications:</b> BM2 Sipware reserves the right to update product pricing, shipping fees, or promotional discounts at any time without prior notice.</li>
            <li><b>Payment Processing:</b> Full payment must be completed at the time of order placement. We accept standard payment methods including UPI, Credit/Debit Cards, Net Banking, and digital wallets via secure, RBI-compliant payment gateways. Orders will not enter production until payment is confirmed.</li>
          </ul>
        </div>

        <div style={{background: '#fff', padding: 32, borderRadius: 'var(--r)', border: '1px solid var(--line)', marginBottom: 24, boxShadow: '0 4px 20px rgba(0,0,0,0.02)', overflow: 'hidden'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16}}>
            <div style={{width: 40, height: 40, minWidth: 40, flexShrink: 0, background: 'var(--bg)', borderRadius: 10, display: 'grid', placeItems: 'center', border: '1px solid var(--line)'}}>
              <IconTruck size={20} color="var(--blue)" />
            </div>
            <h2 style={{fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)', fontWeight: 700, flex: 1, minWidth: 0, wordBreak: 'break-word', lineHeight: 1.3}}>6. Shipping &amp; Delivery Policy</h2>
          </div>
          <ul style={{paddingLeft: 20, lineHeight: 1.8, color: 'var(--ink)'}}>
            <li><b>Fulfillment Time:</b> Standard print-on-demand production and quality inspection typically take <b>1 to 5 business days</b> prior to dispatch.</li>
            <li><b>Domestic Delivery:</b> Physical deliveries across India are handled via courier partners and <b>India Post</b>. Estimated delivery times range between <b>2 to 9 business days</b> after dispatch depending on the destination pin code.</li>
            <li><b>Delivery Delays &amp; Address Accuracy:</b> BM2 Sipware is not responsible for shipping delays caused by incorrect delivery addresses provided at checkout, weather events, natural disasters, or unexpected logistics carrier disruptions.</li>
            <li><b>Re-shipment Fees:</b> If a package is returned to us due to an incorrect address or uncollected delivery attempt, the buyer will be responsible for the cost of re-shipping the order.</li>
          </ul>
        </div>

        <div style={{background: '#fff', padding: 32, borderRadius: 'var(--r)', border: '1px solid var(--line)', marginBottom: 24, boxShadow: '0 4px 20px rgba(0,0,0,0.02)', overflow: 'hidden'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20}}>
            <div style={{width: 40, height: 40, minWidth: 40, flexShrink: 0, background: 'var(--bg)', borderRadius: 10, display: 'grid', placeItems: 'center', border: '1px solid var(--line)'}}>
              <IconAlertTriangle size={20} color="var(--blue)" />
            </div>
            <h2 style={{fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)', fontWeight: 700, flex: 1, minWidth: 0, wordBreak: 'break-word', lineHeight: 1.3}}>7. Cancellations, Returns &amp; Refunds</h2>
          </div>
          <div style={{display: 'grid', gap: 16}}>
            <div style={{background: 'var(--bg)', padding: 18, borderRadius: 12, border: '1px solid var(--line)'}}>
              <h3 style={{fontSize: '1.05rem', fontWeight: 700, color: 'var(--ink)', marginBottom: 8}}>A. Order Cancellations</h3>
              <p style={{fontSize: '0.9rem', color: 'var(--mute)', lineHeight: 1.6, margin: 0}}>
                Because our items are printed on demand immediately upon order confirmation, orders cannot be canceled or modified once production has begun.
              </p>
            </div>
            <div style={{background: 'var(--bg)', padding: 18, borderRadius: 12, border: '1px solid var(--line)'}}>
              <h3 style={{fontSize: '1.05rem', fontWeight: 700, color: 'var(--ink)', marginBottom: 8}}>B. Return &amp; Replacement Policy</h3>
              <p style={{fontSize: '0.9rem', color: 'var(--mute)', lineHeight: 1.6, margin: 0}}>
                Due to the custom nature of print-on-demand ceramics, <b>we do not accept returns or exchanges for change of mind or incorrect size selection</b>.
              </p>
            </div>
            <div style={{background: 'var(--bg)', padding: 18, borderRadius: 12, border: '1px solid var(--line)'}}>
              <h3 style={{fontSize: '1.05rem', fontWeight: 700, color: 'var(--ink)', marginBottom: 8}}>C. Defective or Damaged Shipments</h3>
              <p style={{fontSize: '0.9rem', color: 'var(--mute)', lineHeight: 1.6, marginBottom: 8}}>
                If your order arrives broken, physically damaged during transit, or exhibits a clear manufacturing print defect:
              </p>
              <ol style={{paddingLeft: 20, lineHeight: 1.7, color: 'var(--ink)', fontSize: '0.9rem', margin: 0}}>
                <li>Contact our support team within <b>7 days of delivery</b> at <a href="mailto:support@bm2group.in" style={{color: 'var(--blue)', fontWeight: 600}}>support@bm2group.in</a>.</li>
                <li>Provide your order number, clear photographs, and an unboxing video showing the shipping label and the damaged/defective item.</li>
                <li>Upon verification, BM2 Sipware will issue a replacement at no additional charge or process a store credit/refund.</li>
              </ol>
            </div>
          </div>
        </div>

        <div style={{background: '#fff', padding: 32, borderRadius: 'var(--r)', border: '1px solid var(--line)', marginBottom: 24, boxShadow: '0 4px 20px rgba(0,0,0,0.02)', overflow: 'hidden'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16}}>
            <div style={{width: 40, height: 40, minWidth: 40, flexShrink: 0, background: 'var(--bg)', borderRadius: 10, display: 'grid', placeItems: 'center', border: '1px solid var(--line)'}}>
              <IconAward size={20} color="var(--blue)" />
            </div>
            <h2 style={{fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)', fontWeight: 700, flex: 1, minWidth: 0, wordBreak: 'break-word', lineHeight: 1.3}}>8. Intellectual Property Rights</h2>
          </div>
          <p style={{lineHeight: 1.7, color: 'var(--ink)'}}>
            All original artwork, illustrations, graphics, logos, website designs, text, and media published on <a href="https://sipware.bm2group.in" target="_blank" rel="noopener noreferrer" style={{color: 'var(--blue)', fontWeight: 600}}>sipware.bm2group.in</a> are the exclusive intellectual property of <b>BM2 Group (<a href="https://bm2group.in" target="_blank" rel="noopener noreferrer" style={{color: 'var(--blue)', fontWeight: 600}}>bm2group.in</a>) / BM2 Sipware</b>.
          </p>
          <p style={{lineHeight: 1.7, color: 'var(--ink)', marginTop: 12}}>
            You may not copy, reproduce, distribute, modify, create derivative works from, or commercially exploit any content or designs from our store without explicit prior written authorization from BM2 Group.
          </p>
        </div>

        <div style={{background: '#fff', padding: 32, borderRadius: 'var(--r)', border: '1px solid var(--line)', marginBottom: 24, boxShadow: '0 4px 20px rgba(0,0,0,0.02)', overflow: 'hidden'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16}}>
            <div style={{width: 40, height: 40, minWidth: 40, flexShrink: 0, background: 'var(--bg)', borderRadius: 10, display: 'grid', placeItems: 'center', border: '1px solid var(--line)'}}>
              <IconAlertTriangle size={20} color="var(--blue)" />
            </div>
            <h2 style={{fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)', fontWeight: 700, flex: 1, minWidth: 0, wordBreak: 'break-word', lineHeight: 1.3}}>9. Prohibited Conduct</h2>
          </div>
          <p style={{lineHeight: 1.7, color: 'var(--ink)', marginBottom: 12}}>When using our website and services, you agree not to:</p>
          <ul style={{paddingLeft: 20, lineHeight: 1.8, color: 'var(--ink)'}}>
            <li>Violate any applicable local, national, or international laws or regulations.</li>
            <li>Attempt to gain unauthorized access to our website servers, user databases, or connected systems.</li>
            <li>Use automated scrapers, bots, or data-gathering tools on our platform.</li>
            <li>Submit false, misleading, or fraudulent contact and payment details.</li>
          </ul>
        </div>

        <div style={{background: '#fff', padding: 32, borderRadius: 'var(--r)', border: '1px solid var(--line)', marginBottom: 24, boxShadow: '0 4px 20px rgba(0,0,0,0.02)', overflow: 'hidden'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16}}>
            <div style={{width: 40, height: 40, minWidth: 40, flexShrink: 0, background: 'var(--bg)', borderRadius: 10, display: 'grid', placeItems: 'center', border: '1px solid var(--line)'}}>
              <IconClipboard size={20} color="var(--blue)" />
            </div>
            <h2 style={{fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)', fontWeight: 700, flex: 1, minWidth: 0, wordBreak: 'break-word', lineHeight: 1.3}}>10. Limitation of Liability</h2>
          </div>
          <p style={{lineHeight: 1.7, color: 'var(--ink)', marginBottom: 12}}>To the maximum extent permitted by applicable Indian law:</p>
          <ul style={{paddingLeft: 20, lineHeight: 1.8, color: 'var(--ink)'}}>
            <li>BM2 Sipware and BM2 Group provide all products and services on an &quot;as is&quot; and &quot;as available&quot; basis without express or implied warranties of any kind beyond our standard defect replacement commitment.</li>
            <li>In no event shall BM2 Sipware, BM2 Group, its founder, or affiliates be liable for any indirect, incidental, special, or consequential damages resulting from your use of the website or purchased products.</li>
            <li>BM2 Sipware&apos;s total liability for any claim arising out of an order shall not exceed the total amount paid by you for that specific order.</li>
          </ul>
        </div>

        <div style={{background: '#fff', padding: 32, borderRadius: 'var(--r)', border: '1px solid var(--line)', marginBottom: 24, boxShadow: '0 4px 20px rgba(0,0,0,0.02)', overflow: 'hidden'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16}}>
            <div style={{width: 40, height: 40, minWidth: 40, flexShrink: 0, background: 'var(--bg)', borderRadius: 10, display: 'grid', placeItems: 'center', border: '1px solid var(--line)'}}>
              <IconCheckCircle size={20} color="var(--blue)" />
            </div>
            <h2 style={{fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)', fontWeight: 700, flex: 1, minWidth: 0, wordBreak: 'break-word', lineHeight: 1.3}}>11. Indemnification</h2>
          </div>
          <p style={{lineHeight: 1.7, color: 'var(--ink)'}}>
            You agree to defend, indemnify, and hold harmless BM2 Sipware, BM2 Group, its team, and operating partners from and against any claims, liabilities, damages, losses, or expenses (including legal fees) arising from your violation of these Terms or misuse of our website.
          </p>
        </div>

        <div style={{background: '#fff', padding: 32, borderRadius: 'var(--r)', border: '1px solid var(--line)', marginBottom: 24, boxShadow: '0 4px 20px rgba(0,0,0,0.02)', overflow: 'hidden'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16}}>
            <div style={{width: 40, height: 40, minWidth: 40, flexShrink: 0, background: 'var(--bg)', borderRadius: 10, display: 'grid', placeItems: 'center', border: '1px solid var(--line)'}}>
              <IconBuilding size={20} color="var(--blue)" />
            </div>
            <h2 style={{fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)', fontWeight: 700, flex: 1, minWidth: 0, wordBreak: 'break-word', lineHeight: 1.3}}>12. Governing Law &amp; Dispute Resolution</h2>
          </div>
          <ul style={{paddingLeft: 20, lineHeight: 1.8, color: 'var(--ink)'}}>
            <li><b>Governing Law:</b> These Terms shall be governed by and construed in accordance with the laws of India.</li>
            <li><b>Jurisdiction:</b> Any legal action, dispute, or proceeding arising out of or relating to these Terms or your use of BM2 Sipware shall be subject to the exclusive jurisdiction of the competent courts in Haryana, India.</li>
          </ul>
        </div>
      </div>
    );
  }

  const p=P[slug];
  if(!p)notFound();
  return <div className="wrap" style={{maxWidth: 1050, padding: '56px 20px'}}><h1 style={{fontSize:'2.4rem'}}>{p[0]}</h1>{p[1].map((text,i)=><p key={i}>{text}</p>)}<p><i>BM2 Sipware Customer Support &amp; Policy Guidance.</i></p></div>;
}