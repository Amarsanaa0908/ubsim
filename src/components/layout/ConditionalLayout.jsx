'use client';

import { usePathname } from 'next/navigation';
import Footer from './Footer';
import { Header } from './Header';



// List routes that should NOT show Header and Footer.
const noLayoutRoutes = ['/login', '/signup', '/dashboard', '/merchant/dashboard', '/merchant/orders','/merchant/billing','/merchant/settings'];

export default function ConditionalLayout({children}) {
  const pathname = usePathname();
  const showLayout = !noLayoutRoutes.includes(pathname);
  

  return (
    <>
      {showLayout && <Header />}
      {children}
      {showLayout && <Footer />}
    </>
  );
}
