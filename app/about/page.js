'use client';

function IconPalette({size=22, color="var(--blue)"}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="13.5" cy="6.5" r=".5" fill={color}></circle>
      <circle cx="17.5" cy="10.5" r=".5" fill={color}></circle>
      <circle cx="8.5" cy="7.5" r=".5" fill={color}></circle>
      <circle cx="6.5" cy="12.5" r=".5" fill={color}></circle>
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.92 0 1.7-.71 1.7-1.63 0-.44-.18-.85-.46-1.16-.27-.31-.44-.73-.44-1.21 0-.92.78-1.67 1.7-1.67h2.2c3.1 0 5.6-2.5 5.6-5.6 0-4.8-4.1-8.7-9.3-8.7z"></path>
    </svg>
  );
}

function IconMug({size=22, color="var(--blue)"}) {
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

function IconSparkles({size=22, color="var(--blue)"}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l1.91 5.8 5.8 1.91-5.8 1.91L12 18.42l-1.91-5.8-5.8-1.91 5.8-1.91L12 3z"></path>
      <path d="M5 3l.87 2.63L8.5 6.5 5.87 7.37 5 10l-.87-2.63L1.5 6.5l2.63-.87L5 3z"></path>
      <path d="M19 14l.87 2.63 2.63.87-2.63.87L19 21l-.87-2.63-2.63-.87 2.63-.87L19 14z"></path>
    </svg>
  );
}

function IconLightning({size=22, color="var(--blue)"}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
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

export default function About(){
  return (
    <div className="wrap" style={{maxWidth: 1050, padding: '36px 16px'}}>
      {/* Hero Header */}
      <div style={{textAlign: 'center', marginBottom: 36}}>
        <h1 style={{fontSize: 'clamp(2.2rem, 5vw, 3.6rem)', fontWeight: 800, letterSpacing: '-.03em', marginBottom: 16}}>Our Story &amp; Vision</h1>
        <p style={{fontSize: '1.05rem', color: 'var(--mute)', maxWidth: 680, margin: '0 auto', lineHeight: 1.6}}>
          We believe gifting is about emotions, connections and little things that make people smile. At <b>BM2 Sipware</b> (<a href="https://sipware.bm2group.in" target="_blank" rel="noopener noreferrer" style={{color: 'var(--blue)', fontWeight: 600}}>sipware.bm2group.in</a>), we bring together creative designs and everyday essentials to make gifting more expressive, personal and memorable.
        </p>
      </div>

      {/* BM2 Group Family Card */}
      <div style={{background: 'var(--sage)', borderRadius: '20px', padding: '32px 20px', marginBottom: 32, border: '1px solid var(--line)', boxShadow: '0 10px 30px rgba(0,0,0,0.03)', textAlign: 'center'}}>
        <h2 style={{fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: 800, marginBottom: 12, letterSpacing: '-.02em', color: 'var(--ink)'}}>Part of the BM2 Group Family</h2>
        <p style={{color: 'var(--ink)', fontSize: '0.95rem', lineHeight: 1.6, maxWidth: 760, margin: '0 auto 20px'}}>
          We operate proudly under the <b>BM2 Group</b> (<a href="https://bm2group.in" target="_blank" rel="noopener noreferrer" style={{color: 'var(--ink)', fontWeight: 700, textDecoration: 'underline'}}>bm2group.in</a>) umbrella — a vision dedicated to building something bigger than profits. Driven by our core values, Sipware brings this vision to life by combining bold, expressive artwork with sustainable ceramic craftsmanship to turn everyday items into special moments.
        </p>
        <div>
          <a href="https://bm2group.in/" target="_blank" rel="noopener noreferrer" style={{background: 'var(--ink)', color: '#fff', padding: '12px 28px', borderRadius: 99, fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8, boxShadow: '0 8px 20px rgba(0,0,0,0.12)'}}>
            Know more &rarr;
          </a>
        </div>
      </div>

      {/* Crafting Section */}
      <div style={{background: '#fff', borderRadius: '20px', padding: '32px 20px', border: '1px solid var(--line)', marginBottom: 32, boxShadow: '0 10px 30px rgba(0,0,0,0.02)'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12}}>
          <div style={{width: 38, height: 38, borderRadius: 10, background: 'var(--bg)', display: 'grid', placeItems: 'center', border: '1px solid var(--line)'}}>
            <IconPalette size={20} color="var(--blue)" />
          </div>
          <h2 style={{fontSize: 'clamp(1.4rem, 4vw, 1.8rem)', fontWeight: 800, letterSpacing: '-.02em'}}>How We Craft Your Drinkware</h2>
        </div>
        <p style={{fontSize: '0.98rem', color: 'var(--mute)', lineHeight: 1.6}}>
          Engineered for curved surfaces. Crisp vector lines, vivid color accuracy, and zero-fade durability—printed on demand in small batches via Quikink to eliminate waste. Freshly printed, thoroughly inspected, and sustainably produced.
        </p>
      </div>

      {/* Why Choose Us Section */}
      <div style={{marginBottom: 24}}>
        <div style={{textAlign: 'center', marginBottom: 24}}>
          <h2 style={{fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', fontWeight: 800, letterSpacing: '-.02em'}}>Why Choose Us</h2>
        </div>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16}}>
          {[
            {title: 'Premium Build Quality', desc: 'Heavyweight 11 oz (325 ml) and generous 25 oz (750 ml) options featuring ultra-glossy HD sublimation prints.', icon: <IconMug size={22} color="var(--blue)" />},
            {title: 'Tech & Niche Artwork', desc: 'Custom collections spanning Developer Culture, Logic & Math, Technology, Roots & Wealth, and Relationships.', icon: <IconSparkles size={22} color="var(--blue)" />},
            {title: 'On-Demand Precision', desc: 'Powered by Quikink for fresh printing, rigorous quality inspection, and zero-inventory waste on every unit.', icon: <IconLightning size={22} color="var(--blue)" />},
            {title: 'Nationwide Shipping', desc: 'Fast, reliable Pan-India delivery direct to your door via premier courier partners and India Post.', icon: <IconTruck size={22} color="var(--blue)" />}
          ].map((item, idx) => (
            <div key={idx} style={{background: '#fff', padding: 24, borderRadius: '18px', border: '1px solid var(--line)', boxShadow: '0 4px 20px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column', gap: 12}}>
              <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
                <div style={{width: 40, height: 40, minWidth: 40, flexShrink: 0, borderRadius: 10, background: 'var(--bg)', display: 'grid', placeItems: 'center', border: '1px solid var(--line)'}}>
                  {item.icon}
                </div>
                <h3 style={{fontSize: '1.05rem', fontWeight: 700, margin: 0}}>{item.title}</h3>
              </div>
              <p style={{color: 'var(--mute)', fontSize: '0.88rem', lineHeight: 1.5, margin: 0}}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
