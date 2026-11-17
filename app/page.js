import Link from 'next/link';
import {list} from '@/lib/db';
import ProductCard,{Img} from '@/components/ProductCard';
import WhatWeSellSection from '@/components/WhatWeSellSection';

export const dynamic='force-dynamic';

function IconSparkles({size=16, color="var(--blue)"}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{display: 'inline-block', verticalAlign: 'middle', marginRight: 6}}>
      <path d="M12 3l1.91 5.8 5.8 1.91-5.8 1.91L12 18.42l-1.91-5.8-5.8-1.91 5.8-1.91L12 3z"></path>
    </svg>
  );
}

function IconWheat({size=24, color="var(--blue)"}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 22s5-4 5-10"></path>
      <path d="M7 12a5 5 0 0 1 5-5s-1 3-5 5z"></path>
      <path d="M7 17a5 5 0 0 1 5-5s-1 3-5 5z"></path>
      <path d="M2 17a5 5 0 0 1 5-5s-1 3-5 5z"></path>
      <path d="M7 7a5 5 0 0 1 5-5s-1 3-5 5z"></path>
    </svg>
  );
}

function IconTrendingUp({size=24, color="var(--blue)"}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
      <polyline points="17 6 23 6 23 12"></polyline>
    </svg>
  );
}

function IconHeart({size=24, color="var(--blue)"}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
    </svg>
  );
}

function IconLaptop({size=24, color="var(--blue)"}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
      <line x1="2" y1="20" x2="22" y2="20"></line>
    </svg>
  );
}

function IconHeadphones({size=16, color="currentColor"}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{display: 'inline-block', verticalAlign: 'middle', marginRight: 6}}>
      <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
      <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
    </svg>
  );
}

export default async function Home(){
 const all=await list('products',{active:true});
 const featured=all.filter(p=>p.featured).slice(0,4),fresh=all.slice(0,4);
 const cats=[...new Set(all.map(p=>p.category).filter(Boolean))];
 const Sec=({t,l})=>l.length?<section><div className="wrap"><div className="row"><h2>{t}</h2><Link className="link" href="/shop">View all</Link></div><div className="grid">{l.map(p=><ProductCard key={p.id} p={p}/>)}</div></div></section>:null;
 return <>
 <div className="wrap hero">
 <img src="/sipware-logo.png" alt="SIPWARE"/>
 <div>
  <span style={{display:'inline-block',background:'var(--sage)',color:'var(--ink)',padding:'6px 14px',borderRadius:99,fontWeight:600,fontSize:'0.85rem',marginBottom:16}}>New Era of Gifting</span>
  <h1 style={{fontSize:'clamp(2.4rem,5vw,4.2rem)',fontWeight:800,lineHeight:1.1,marginBottom:20}}>Gifts That Get Your Vibe</h1>
  <p style={{color:'var(--mute)',fontSize:'1.18rem',lineHeight:1.65,marginBottom:28,maxWidth:'44ch'}}>Because every event deserves something special. <b>BM2 Sipware</b> delivers vibrant, durable, print-on-demand artwork that is personal, expressive, and built to turn everyday items into special moments.</p>
  <div style={{display:'flex',gap:14,flexWrap:'wrap'}}><Link className="btn" href="/shop">Visit Shop</Link><Link className="btn ghost" href="/policy/shipping">About Shipping</Link></div>
 </div>
</div>
 <Sec t="Featured Collection" l={featured.length?featured:fresh}/>
 <section className="soft" style={{padding:'56px 0'}}>
  <div className="wrap">
   <div style={{textAlign:'center',marginBottom:36}}>
    <span style={{display:'inline-block',background:'#fff',color:'var(--ink)',padding:'6px 16px',borderRadius:99,fontWeight:600,fontSize:'0.85rem',marginBottom:12}}>
      <IconSparkles size={16} color="var(--blue)" /> A Little Gift. A Lasting Memory.
    </span>
    <h2 style={{fontSize:'clamp(1.8rem,4vw,2.8rem)',fontWeight:800}}>Shop by Category</h2>
   </div>
   <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(250px,1fr))',gap:24}}>
    {[
      {title:'ROOTS', sub:'Culture. Pride. Identity.', desc:'For those who never forget where they come from.', cat:'JAAT Haryanvi', icon:<IconWheat size={24} color="var(--blue)" />},
      {title:'WEALTH', sub:'Think. Trade. Grow.', desc:'For the dreamers, hustlers and market minds.', cat:'Stock Market', icon:<IconTrendingUp size={24} color="var(--blue)" />},
      {title:'RELATIONSHIPS', sub:'Love. Bonds. Memories.', desc:'For the people who make every moment meaningful.', cat:'Relationships', icon:<IconHeart size={24} color="var(--blue)" />},
      {title:'TECHNOLOGY', sub:'Code. Create. Innovate.', desc:'For the builders, thinkers and tech enthusiasts.', cat:'Corporate Engineers', icon:<IconLaptop size={24} color="var(--blue)" />}
    ].map(item => (
      <Link key={item.title} href={`/shop?cat=${encodeURIComponent(item.cat)}`} className="category-card" style={{background:'#fff',borderRadius:'24px',padding:32,border:'1px solid var(--line)',display:'flex',flexDirection:'column',justifyContent:'space-between',textDecoration:'none'}}>
        <div>
          <div style={{width:52,height:52,borderRadius:14,background:'var(--bg)',display:'grid',placeItems:'center',marginBottom:20,border:'1px solid var(--line)'}}>{item.icon}</div>
          <h3 style={{fontSize:'1.4rem',fontWeight:800,marginBottom:8,letterSpacing:'-.01em',color:'var(--ink)'}}>{item.title}</h3>
          <p style={{fontSize:'0.95rem',fontWeight:700,color:'var(--blue)',marginBottom:12}}>{item.sub}</p>
          <p style={{fontSize:'0.9rem',color:'var(--mute)',lineHeight:1.6}}>{item.desc}</p>
        </div>
        <div style={{marginTop:24,display:'flex',alignItems:'center',gap:6,fontWeight:700,fontSize:'0.9rem',color:'var(--ink)'}}>
          Explore collection &rarr;
        </div>
      </Link>
    ))}
   </div>
  </div>
 </section>
 <WhatWeSellSection />
 <section className="soft">
  <div className="wrap">
   <h2 style={{marginBottom:24}}>What customers say</h2>
   <div className="quotes">
    {['The print is sharp and the colours match the photos.','Arrived in three days. My new favourite desk mug.','Bought four as gifts. Everyone asked where they were from.'].map(q=><blockquote key={q}>“{q}”</blockquote>)}
   </div>
  </div>
 </section>
 <section style={{padding:'48px 0'}}>
  <div className="wrap">
   <div style={{background:'linear-gradient(135deg, #16202B, #243C8F)',color:'#fff',borderRadius:'24px',padding:'48px 24px',textAlign:'center',position:'relative',overflow:'hidden',boxShadow:'0 20px 50px rgba(0,0,0,0.1)'}}>
    <div style={{position:'absolute',top:-50,right:-50,width:200,height:200,background:'rgba(255,255,255,0.05)',borderRadius:'50%',pointerEvents:'none'}}/>
    <span style={{display:'inline-block',background:'rgba(255,255,255,0.1)',color:'#fff',padding:'6px 16px',borderRadius:99,fontWeight:600,fontSize:'0.85rem',marginBottom:16}}>
      <IconHeadphones size={16} color="#fff" /> We&apos;re Here For You
    </span>
    <h2 style={{fontSize:'clamp(1.8rem, 4vw, 3rem)',fontWeight:800,marginBottom:16,letterSpacing:'-.02em'}}>Get in Touch</h2>
    <p style={{color:'rgba(255,255,255,0.85)',fontSize:'1.05rem',maxWidth:480,margin:'0 auto 28px',lineHeight:1.6}}>Have questions, need custom corporate orders, or assistance? Our team is always here to help.</p>
    <Link className="btn" href="/contact" style={{background:'#fff',color:'var(--ink)',padding:'14px 32px',fontSize:'1rem',boxShadow:'0 10px 25px rgba(0,0,0,0.2)'}}>Contact Support</Link>
   </div>
  </div>
 </section></>
}
