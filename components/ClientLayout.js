'use client';
import {usePathname} from 'next/navigation';
import {useState, useEffect} from 'react';
import Header from './Header';
import Footer from './Footer';
import ImageKitProviderWrapper from './ImageKitProviderWrapper';

function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShow(true);
      } else {
        setShow(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!show) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      style={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        width: 44,
        height: 44,
        borderRadius: '50%',
        background: 'var(--blue)',
        color: '#fff',
        border: '0',
        cursor: 'pointer',
        display: 'grid',
        placeItems: 'center',
        boxShadow: '0 6px 20px rgba(36, 60, 143, 0.35)',
        zIndex: 999,
        transition: 'transform 0.2s ease, background 0.2s ease',
        fontWeight: 800,
        fontSize: '1.2rem'
      }}
      onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'}
      onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
    >
      &uarr;
    </button>
  );
}

export default function ClientLayout({children}){
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  return (
    <ImageKitProviderWrapper>
      {!isAdmin && <Header />}
      <main>{children}</main>
      {!isAdmin && <Footer />}
      <BackToTop />
    </ImageKitProviderWrapper>
  );
}
