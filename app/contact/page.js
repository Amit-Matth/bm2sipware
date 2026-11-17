'use client';

import {useState} from 'react';

const FAQ = [
  ['How long does delivery take?', 'Standard orders typically arrive within 5 to 8 working days. For remote or pin codes serviced by India Post, delivery may take 3 to 15 working days.'],
  ['Do you support Cash on Delivery (COD)?', 'Yes! You can choose Cash on Delivery at checkout (a small COD fee applies). Prepaid orders receive priority processing and special discounts.'],
  ['What are the shipping charges?', 'Standard shipping is calculated at checkout. If a pin code requires India Post (₹63.7 for 0.5 Kg or ₹127.4 for northeast pin codes), differential costs are managed transparently.'],
  ['How do I track my order?', 'Once your shipping label is generated, you can track your order live from your dashboard. We support multiple statuses from pickup to delivery.'],
  ['What if my mug arrives damaged?', 'If your mug arrives damaged, broken, or misprinted, email us or message us within 7 days with photos for a free replacement or full refund.'],
  ['Can I cancel or modify my order?', 'Orders can be cancelled within 2 hours of placing them before printing begins in our studio. After printing starts, cancellations are not available.'],
  ['Are BM2 Sipware mugs microwave and dishwasher safe?', 'Yes! All our custom ceramic mugs feature high-definition sublimation prints that are pre-tested and 100% safe for daily microwave and dishwasher use.'],
  ['Do you accept bulk or corporate custom orders?', 'Absolutely! You can submit custom artwork or request bulk pricing for corporate gifting, events, and celebrations directly via our Custom Print page or support email.'],
  ['Can I send a mug directly as a gift to someone?', 'Yes! Enter the recipient\'s address as the shipping address at checkout, and select Custom Gift Packaging for occasion wrapping and a personalized unboxing experience.']
];

export default function Contact(){
  const [sent, setSent] = useState(false);
  const [openFaq, setOpenFaq] = useState({});
  const toggleFaq = (idx) => setOpenFaq(prev => ({...prev, [idx]: !prev[idx]}));

  return (
    <div className="wrap" style={{maxWidth: 950, padding: '36px 16px'}}>
      <div style={{textAlign: 'center', marginBottom: 36}}>
        <h1 style={{fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 800, marginBottom: 12}}>Get in Touch</h1>
        <p style={{color: 'var(--mute)', fontSize: '0.98rem', maxWidth: 540, margin: '0 auto', lineHeight: 1.5}}>Have questions about our mugs, shipping, or custom orders? We&apos;re always here to help you out.</p>
      </div>

      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, marginBottom: 48}}>
        {/* Left Support Card */}
        <div style={{background: '#fff', padding: 24, borderRadius: '20px', border: '1px solid var(--line)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 20}}>
          <div>
            <h3 style={{fontSize: '1.2rem', marginBottom: 12}}>Support, Bugs &amp; Feedback</h3>
            <p style={{color: 'var(--mute)', marginBottom: 16, fontSize: '0.9rem', lineHeight: 1.5}}>
              Reach out to us directly via email for any order inquiries, support, reporting website bugs, or sharing feedback.
            </p>
            <div style={{display: 'grid', gap: 12, marginBottom: 10, fontSize: '0.9rem'}}>
              <div><small style={{color: 'var(--mute)', display: 'block'}}>Email us directly</small><b>support@bm2group.in</b></div>
            </div>
          </div>

          <div style={{display: 'grid', gap: 10}}>
            <div style={{fontSize: '0.82rem', color: 'var(--mute)', lineHeight: 1.4, background: 'rgba(36, 60, 143, 0.04)', padding: 12, borderRadius: 12, borderLeft: '3px solid var(--blue)'}}>
              <b>Filing a damage claim?</b> Email your unboxing video &amp; Order ID directly to <a href="mailto:support@bm2group.in" style={{color: 'var(--blue)', fontWeight: 600}}>support@bm2group.in</a>.
            </div>
            <div style={{background: 'var(--bg)', padding: 12, borderRadius: 12, fontSize: '0.82rem', color: 'var(--mute)'}}>
              💡 Tip: Include your order ID or bug screenshots in your email for faster assistance.
            </div>
          </div>
        </div>

        {/* Right Send Message Card */}
        <div style={{background: '#fff', padding: 24, borderRadius: '20px', border: '1px solid var(--line)'}}>
          <h3 style={{fontSize: '1.2rem', marginBottom: 14}}>Send a Message</h3>
          {sent ? (
            <div style={{padding: 24, textAlign: 'center', background: 'var(--bg)', borderRadius: 12}}>
              <h4 style={{color: 'var(--blue)', marginBottom: 6}}>Message Sent Successfully!</h4>
              <p style={{color: 'var(--mute)', fontSize: '0.88rem'}}>Thank you. We will review your message and reply within one working day.</p>
            </div>
          ) : (
            <form className="form" onSubmit={e => {e.preventDefault(); setSent(true);}}>
              <input required placeholder="Your Name" />
              <input required type="email" placeholder="Email Address" />
              <input placeholder="Order ID (Optional)" />
              <textarea required rows={4} placeholder="How can we help you today?" />
              <button className="btn" style={{width: '100%', marginTop: 4}}>Send Message</button>
            </form>
          )}
        </div>
      </div>

      <div style={{background: '#fff', padding: 24, borderRadius: '20px', border: '1px solid var(--line)'}}>
        <h2 style={{fontSize: 'clamp(1.4rem, 4vw, 1.8rem)', marginBottom: 6, textAlign: 'center'}}>Frequently Asked Questions</h2>
        <p style={{color: 'var(--mute)', textAlign: 'center', marginBottom: 24, fontSize: '0.88rem'}}>Everything you need to know about ordering, shipping, and returns.</p>
        <div style={{display: 'grid', gap: 12}}>
          {FAQ.map(([q, a], idx) => {
            const isOpen = !!openFaq[idx];
            return (
              <div
                key={q}
                onClick={() => toggleFaq(idx)}
                style={{
                  padding: 16,
                  background: isOpen ? '#fff' : 'var(--bg)',
                  borderRadius: 12,
                  border: isOpen ? '1px solid var(--blue)' : '1px solid var(--line)',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease'
                }}
              >
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12}}>
                  <span style={{fontWeight: 600, fontSize: '0.95rem', color: isOpen ? 'var(--blue)' : 'var(--ink)'}}>{q}</span>
                  <div style={{
                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s ease',
                    width: 24, height: 24, borderRadius: '50%', background: isOpen ? 'rgba(36,60,143,0.08)' : 'transparent',
                    display: 'grid', placeItems: 'center', color: isOpen ? 'var(--blue)' : 'var(--mute)',
                    flexShrink: 0
                  }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </div>
                </div>
                {isOpen && (
                  <p style={{color: 'var(--mute)', lineHeight: 1.5, fontSize: '0.88rem', margin: '10px 0 0'}}>
                    {a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
