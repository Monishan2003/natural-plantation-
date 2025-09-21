import { useState, useEffect } from 'react';
import { Product } from '../lib/types';
import { MockDatabase } from '../lib/database';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProducts = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const [allProducts, featured] = await Promise.all([
        MockDatabase.getAllProducts(),
        MockDatabase.getFeaturedProducts()
      ]);
      
      setProducts(allProducts);
      setFeaturedProducts(featured);
    } catch (err) {
      setError('Failed to load products');
      console.error('Error loading products:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const getProductsByCategory = async (category: string) => {
    try {
      return await MockDatabase.getProductsByCategory(category);
    } catch (err) {
      console.error('Error loading products by category:', err);
      return [];
    }
  };

  const refreshProducts = () => {
    loadProducts();
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return {
    products,
    featuredProducts,
    isLoading,
    error,
    getProductsByCategory,
    refreshProducts
  };
};