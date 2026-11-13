import Link from 'next/link';
export default function Footer(){return <footer className="ftr"><div className="wrap ftr-in">
 <div><b className="logo">BM2 Sipware</b><p>Original mug art in 11 OZ & 25 OZ sizes, printed and shipped on demand.</p></div>
 <div><h4>Shop Niches</h4><Link href="/shop?cat=JAAT+Haryanvi">Roots</Link><Link href="/shop?cat=Stock+Market">Wealth</Link><Link href="/shop?cat=Relationships">Relationships</Link><Link href="/shop?cat=Corporate+Engineers">Technology</Link></div>
 <div><h4>Help</h4><Link href="/contact">Contact</Link><Link href="/custom-print">Custom Prints</Link><Link href="/policy/shipping">Shipping Policy</Link><Link href="/policy/returns">Returns &amp; Refunds</Link></div>
 <div><h4>Legal</h4><Link href="/policy/privacy">Privacy Policy</Link><Link href="/policy/terms">Terms of Service</Link></div></div></footer>}
