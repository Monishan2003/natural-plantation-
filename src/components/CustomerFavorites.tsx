import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductCard } from './ProductCard';
import { MockDatabase } from '../lib/database';
import { Product } from '../lib/types';
import { Skeleton } from './ui/skeleton';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';

export function CustomerFavorites() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadFeaturedProducts = async () => {
      try {
        const featuredProducts = await MockDatabase.getFeaturedProducts();
        setProducts(featuredProducts);
      } catch (error) {
        console.error('Failed to load featured products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadFeaturedProducts();
  }, []);

  if (isLoading) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-6 font-primary">
              Our Customer Favorites
            </h2>
            <p className="text-lg text-[var(--text-secondary)] font-secondary">
              Most loved products by our community - tried, tested, and highly rated
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }, (_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-48 w-full rounded-lg" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-10 w-full rounded-lg" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-6 font-primary">
            Our Customer Favorites
          </h2>
          <p className="text-lg text-[var(--text-secondary)] font-secondary">
            Most loved products by our community - tried, tested, and highly rated
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-[var(--text-secondary)]">
              No featured products available at the moment.
            </p>
          </div>
        )}
        
        {products.length > 0 && (
          <div className="text-center mt-12">
            <Button 
              onClick={() => navigate('/shop')}
              className="bg-[var(--primary-green)] hover:bg-[var(--primary-green)]/90 text-white px-8 py-3 rounded-full font-secondary"
            >
              View All Products
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}