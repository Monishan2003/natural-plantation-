import React, { useState, useEffect } from 'react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { ShoppingCart, Plus, Minus, Trash2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { MockDatabase } from '../lib/database';
import { CartItem, Product } from '../lib/types';
import { toast } from 'sonner@2.0.3';

interface CartDrawerProps {
  children: React.ReactNode;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ children }) => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const loadCart = async () => {
    if (!user) {
      setCartItems([]);
      return;
    }

    setIsLoading(true);
    try {
      const cart = await MockDatabase.getCart(user.id);
      const allProducts = await MockDatabase.getAllProducts();
      setCartItems(cart);
      setProducts(allProducts);
    } catch (error) {
      console.error('Failed to load cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadCart();
    }
  }, [user, isOpen]);

  const updateQuantity = async (productId: string, newQuantity: number) => {
    if (!user) return;

    if (newQuantity <= 0) {
      await removeItem(productId);
      return;
    }

    try {
      // Find current item and calculate difference
      const currentItem = cartItems.find(item => item.productId === productId);
      if (currentItem) {
        const difference = newQuantity - currentItem.quantity;
        if (difference > 0) {
          await MockDatabase.addToCart(user.id, productId, difference);
        } else {
          // For reducing quantity, we need to update the cart directly
          const updatedCart = cartItems.map(item => 
            item.productId === productId 
              ? { ...item, quantity: newQuantity }
              : item
          );
          localStorage.setItem(`np_cart_${user.id}`, JSON.stringify(updatedCart));
        }
        loadCart();
      }
    } catch (error) {
      toast.error('Failed to update quantity');
    }
  };

  const removeItem = async (productId: string) => {
    if (!user) return;

    try {
      await MockDatabase.removeFromCart(user.id, productId);
      loadCart();
      toast.success('Item removed from cart');
    } catch (error) {
      toast.error('Failed to remove item');
    }
  };

  const clearCart = async () => {
    if (!user) return;

    try {
      await MockDatabase.clearCart(user.id);
      loadCart();
      toast.success('Cart cleared');
    } catch (error) {
      toast.error('Failed to clear cart');
    }
  };

  const getCartItemsWithProducts = () => {
    return cartItems.map(cartItem => {
      const product = products.find(p => p.id === cartItem.productId);
      return { cartItem, product };
    }).filter(item => item.product);
  };

  const getTotalPrice = () => {
    return getCartItemsWithProducts().reduce((total, { cartItem, product }) => {
      return total + (product!.price * cartItem.quantity);
    }, 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const formatPrice = (price: number, currency: string = 'LKR') => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  const cartItemsWithProducts = getCartItemsWithProducts();
  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <div className="relative cursor-pointer">
          {children}
          {totalItems > 0 && (
            <Badge 
              className="absolute -top-2 -right-2 bg-[var(--accent-red)] text-white h-5 w-5 rounded-full flex items-center justify-center text-xs p-0"
            >
              {totalItems}
            </Badge>
          )}
        </div>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Shopping Cart
          </SheetTitle>
          <SheetDescription>
            {totalItems === 0 ? 'Your cart is empty' : `${totalItems} item${totalItems !== 1 ? 's' : ''} in your cart`}
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 flex-1 overflow-y-auto">
          {!user ? (
            <div className="text-center py-8">
              <ShoppingCart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Please login to view your cart</p>
            </div>
          ) : isLoading ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Loading cart...</p>
            </div>
          ) : cartItemsWithProducts.length === 0 ? (
            <div className="text-center py-8">
              <ShoppingCart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Your cart is empty</p>
              <p className="text-sm text-muted-foreground mt-2">Add some products to get started</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItemsWithProducts.map(({ cartItem, product }) => (
                <div key={cartItem.productId} className="flex gap-4 p-4 border rounded-lg">
                  <img 
                    src={product!.image} 
                    alt={product!.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium line-clamp-1">{product!.name}</h4>
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {product!.description}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="font-medium" style={{ color: 'var(--primary-green)' }}>
                        {formatPrice(product!.price, product!.currency)}
                      </span>
                      <div className="flex items-center gap-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="h-8 w-8 p-0"
                          onClick={() => updateQuantity(cartItem.productId, cartItem.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center">{cartItem.quantity}</span>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="h-8 w-8 p-0"
                          onClick={() => updateQuantity(cartItem.productId, cartItem.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                          onClick={() => removeItem(cartItem.productId)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cartItemsWithProducts.length > 0 && (
          <div className="border-t pt-4 mt-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-medium">Total</span>
              <span className="font-semibold text-lg" style={{ color: 'var(--primary-green)' }}>
                {formatPrice(totalPrice)}
              </span>
            </div>
            
            <div className="space-y-2">
              <Button 
                className="w-full bg-[var(--primary-green)] hover:bg-[var(--primary-green)]/90"
                size="lg"
              >
                Checkout
              </Button>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={clearCart}
              >
                Clear Cart
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};