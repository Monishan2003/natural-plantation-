import { Header } from './Header';
import { Breadcrumb } from './Breadcrumb';
import { ScrollToTop } from './ScrollToTop';
import { Newsletter } from './Newsletter';
import { Footer } from './Footer';
import { AdminAccess } from './AdminAccess';
import { Toaster } from './ui/sonner';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen">
      <ScrollToTop />
      <Header />
      <Breadcrumb />
      <main>
        {children}
      </main>
      <Newsletter />
      <Footer />
      <AdminAccess />
      <Toaster position="top-right" />
    </div>
  );
}