'use client';
import {usePathname} from 'next/navigation';
import Header from './Header';
import Footer from './Footer';
import ImageKitProviderWrapper from './ImageKitProviderWrapper';

export default function ClientLayout({children}){
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  return (
    <ImageKitProviderWrapper>
      {!isAdmin && <Header />}
      <main>{children}</main>
      {!isAdmin && <Footer />}
    </ImageKitProviderWrapper>
  );
}
