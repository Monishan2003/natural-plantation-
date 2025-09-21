import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Heart, ShoppingCart, Plus } from 'lucide-react';
import { Product } from '../lib/types';
import { useAuth } from '../contexts/AuthContext';
import { MockDatabase } from '../lib/database';
import { toast } from 'sonner@2.0.3';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { user } = useAuth();

  const handleAddToCart = async () => {
    if (!user) {
      toast.error('Please login to add items to cart');
      return;
    }

    try {
      await MockDatabase.addToCart(user.id, product.id);
      toast.success('Added to cart!');
    } catch (error) {
      toast.error('Failed to add to cart');
    }
  };

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-200">
      <div className="relative overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.featured && (
          <Badge 
            className="absolute top-2 left-2 bg-[var(--accent-red)] text-white"
          >
            Featured
          </Badge>
        )}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button 
            size="sm" 
            variant="secondary" 
            className="h-8 w-8 p-0 rounded-full bg-white/90 hover:bg-white"
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <Badge variant="destructive">Out of Stock</Badge>
          </div>
        )}
      </div>
      
      <CardContent className="p-4">
        <div className="space-y-2">
          <Badge variant="outline" className="text-xs">
            {product.category}
          </Badge>
          <h3 className="font-medium line-clamp-2 min-h-[2.5rem]">
            {product.name}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 min-h-[2.5rem]">
            {product.description}
          </p>
          <div className="flex items-center justify-between pt-2">
            <span className="font-semibold text-lg" style={{ color: 'var(--primary-green)' }}>
              {formatPrice(product.price, product.currency)}
            </span>
            <Button 
              size="sm" 
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="bg-[var(--primary-green)] hover:bg-[var(--primary-green)]/90 text-white"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};