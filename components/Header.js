'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from './CartProvider';

function IconMenu({ size = 22, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="6" x2="21" y2="6"></line>
      <line x1="3" y1="12" x2="21" y2="12"></line>
      <line x1="3" y1="18" x2="21" y2="18"></line>
    </svg>
  );
}

function IconClose({ size = 22, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  );
}

function IconShoppingBag({ size = 18, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
      <line x1="3" y1="6" x2="21" y2="6"></line>
      <path d="M16 10a4 4 0 0 1-8 0"></path>
    </svg>
  );
}

function IconSparkles({ size = 18, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l1.91 5.8 5.8 1.91-5.8 1.91L12 18.42l-1.91-5.8-5.8-1.91 5.8-1.91L12 3z"></path>
    </svg>
  );
}

export default function Header() {
  const pathname = usePathname();
  const { count, cartBump } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile drawer when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Original desktop navigation links
  const desktopNavLinks = [
    { name: 'Shop', href: '/shop' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Track order', href: '/account' },
  ];

  // Mobile drawer links
  const mobileNavLinks = [
    { name: 'Shop', href: '/shop' },
    { name: 'Custom Print', href: '/custom-print' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Track order', href: '/account' },
  ];

  return (
    <>
      <header
        className="hdr"
        style={{
          background: 'rgba(246, 246, 243, 0.95)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid var(--line)',
          position: 'sticky',
          top: 0,
          zIndex: 50
        }}
      >
        <div className="wrap hdr-in" style={{ height: 68, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>

          {/* Left Side: Mobile Hamburger & Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <button
              className="mob-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
              style={{
                background: 'var(--bg)',
                border: '1px solid var(--line)',
                borderRadius: 12,
                width: 42,
                height: 42,
                display: 'none', // Shown on mobile via CSS
                placeItems: 'center',
                cursor: 'pointer',
                color: 'var(--ink)',
                transition: 'all 0.2s ease'
              }}
            >
              {mobileMenuOpen ? <IconClose size={22} /> : <IconMenu size={22} />}
            </button>

            <Link
              href="/"
              className="logo"
              style={{
                fontSize: '1.35rem',
                fontWeight: 800,
                letterSpacing: '-.02em',
                color: 'var(--ink)',
                transition: 'color 0.2s ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8
              }}
            >
              <span>BM2 Sipware</span>
            </Link>
          </div>

          {/* Center: Desktop Nav Items */}
          <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.95rem' }}>
            {desktopNavLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    padding: '8px 16px',
                    borderRadius: 99,
                    fontWeight: isActive ? 700 : 600,
                    color: isActive ? 'var(--blue)' : 'var(--ink)',
                    background: isActive ? 'rgba(36, 60, 143, 0.08)' : 'transparent',
                    transition: 'all 0.2s ease',
                    border: isActive ? '1px solid rgba(36, 60, 143, 0.15)' : '1px solid transparent',
                    textDecoration: 'none'
                  }}
                  className="nav-link-item"
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Side: Cart Link */}
          <Link
            href="/cart"
            className="cartlink"
            aria-label="Cart"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '8px 16px',
              borderRadius: 99,
              fontWeight: (pathname === '/cart' || cartBump) ? 700 : 600,
              fontSize: '0.95rem',
              color: (pathname === '/cart' || cartBump) ? 'var(--blue)' : 'var(--ink)',
              background: (pathname === '/cart' || cartBump) ? 'rgba(36, 60, 143, 0.12)' : 'var(--bg)',
              border: (pathname === '/cart' || cartBump) ? '1px solid rgba(36, 60, 143, 0.25)' : '1px solid var(--line)',
              transform: cartBump ? 'scale(1.12)' : 'scale(1)',
              transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}
          >
            <span className="cart-text">Cart</span>
            <b style={{
              background: 'var(--blue)',
              color: '#fff',
              borderRadius: 99,
              padding: '2px 8px',
              fontSize: '0.8rem',
              marginLeft: 6,
              fontWeight: 700,
              transform: cartBump ? 'scale(1.25)' : 'scale(1)',
              transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}>
              {count}
            </b>
          </Link>
        </div>
      </header>

      {/* Mobile Backdrop Overlay (Mounted Outside Header) */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(4px)',
            zIndex: 9998,
            animation: 'fadeIn 0.25s ease forwards'
          }}
        />
      )}

      {/* Slide-out Mobile Navigation Drawer (Mounted Outside Header) */}
      <aside
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          bottom: 0,
          width: 'min(340px, 88vw)',
          background: '#fff',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '48px 24px 32px 24px',
          boxShadow: '15px 0 50px rgba(0,0,0,0.3)',
          transform: mobileMenuOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          visibility: mobileMenuOpen ? 'visible' : 'hidden',
          overflowY: 'auto'
        }}
      >
        <div>
          {/* Drawer Top Row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28, paddingBottom: 18, borderBottom: '1px solid var(--line)' }}>
            <Link href="/" onClick={() => setMobileMenuOpen(false)} style={{ fontWeight: 800, fontSize: '1.35rem', color: 'var(--ink)' }}>
              BM2 Sipware
            </Link>
            <button
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
              style={{
                background: 'var(--bg)',
                border: '1px solid var(--line)',
                borderRadius: '50%',
                width: 40,
                height: 40,
                display: 'grid',
                placeItems: 'center',
                cursor: 'pointer',
                color: 'var(--ink)'
              }}
            >
              <IconClose size={22} />
            </button>
          </div>

          {/* Navigation Links List (Without redundant Home button) */}
          <nav style={{ display: 'grid', gap: 12 }}>
            {mobileNavLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    padding: '14px 18px',
                    borderRadius: 14,
                    fontWeight: isActive ? 700 : 600,
                    color: isActive ? 'var(--blue)' : 'var(--ink)',
                    background: isActive ? 'rgba(36, 60, 143, 0.08)' : 'var(--bg)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    border: '1px solid var(--line)'
                  }}
                >
                  <span>{link.name}</span>
                  <span style={{ fontSize: '0.9rem', color: 'var(--mute)' }}>&rarr;</span>
                </Link>
              );
            })}
          </nav>

          {/* Custom Print Spotlight Banner */}
          <div style={{ marginTop: 28, background: 'linear-gradient(135deg, var(--blue), #16202B)', color: '#fff', padding: 20, borderRadius: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.85rem', fontWeight: 700, marginBottom: 4 }}>
              <IconSparkles size={16} color="#fff" /> Personalized Art
            </div>
            <p style={{ fontSize: '0.82rem', opacity: 0.9, lineHeight: 1.4, marginBottom: 12 }}>
              Upload your own photo or custom design for just +₹50 extra!
            </p>
            <Link
              href="/custom-print"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                display: 'block',
                textAlign: 'center',
                background: '#fff',
                color: 'var(--ink)',
                padding: '10px 14px',
                borderRadius: 99,
                fontSize: '0.85rem',
                fontWeight: 700
              }}
            >
              Order Custom Drinkware
            </Link>
          </div>
        </div>

        {/* Drawer Bottom Actions */}
        <div style={{ marginTop: 28, paddingTop: 16, borderTop: '1px solid var(--line)', display: 'grid', gap: 10 }}>
          <Link
            href="/cart"
            onClick={() => setMobileMenuOpen(false)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              background: 'var(--blue)',
              color: '#fff',
              padding: '14px',
              borderRadius: 14,
              fontWeight: 700,
              fontSize: '0.95rem'
            }}
          >
            <IconShoppingBag size={18} color="#fff" />
            <span>View Shopping Cart ({count})</span>
          </Link>
          <div style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--mute)', marginTop: 4 }}>
            Original art mugs &amp; bottles shipped across India
          </div>
        </div>
      </aside>

      <style jsx global>{`
        @media (max-width: 800px) {
          .desktop-nav { display: none !important; }
          .mob-menu-btn { display: grid !important; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </>
  );
}
