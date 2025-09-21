import { Hero } from '../components/Hero';
import { ProductCategories } from '../components/ProductCategories';
import { SpecialPromotions } from '../components/SpecialPromotions';
import { CustomerFavorites } from '../components/CustomerFavorites';
import { TrustSection } from '../components/TrustSection';
import { Testimonials } from '../components/Testimonials';

export function Home() {
  return (
    <>
      <Hero />
      <ProductCategories />
      <SpecialPromotions />
      <CustomerFavorites />
      <TrustSection />
      <Testimonials />
    </>
  );
}