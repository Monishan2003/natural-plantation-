import { useState, useEffect } from 'react';
import { CartItem, Product } from '../lib/types';
import { MockDatabase } from '../lib/database';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner@2.0.3';

export const useCart = () => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadCart = async () => {
    if (!user) {
      setCartItems([]);
      return;
    }

    setIsLoading(true);
    try {
      const [cart, allProducts] = await Promise.all([
        MockDatabase.getCart(user.id),
        MockDatabase.getAllProducts()
      ]);
      
      setCartItems(cart);
      setProducts(allProducts);
    } catch (error) {
      console.error('Failed to load cart:', error);
      toast.error('Failed to load cart');
    } finally {
      setIsLoading(false);
    }
  };

  const addToCart = async (productId: string, quantity: number = 1) => {
    if (!user) {
      toast.error('Please login to add items to cart');
      return false;
    }

    try {
      await MockDatabase.addToCart(user.id, productId, quantity);
      await loadCart();
      toast.success('Added to cart!');
      return true;
    } catch (error) {
      console.error('Failed to add to cart:', error);
      toast.error('Failed to add to cart');
      return false;
    }
  };

  const removeFromCart = async (productId: string) => {
    if (!user) return false;

    try {
      await MockDatabase.removeFromCart(user.id, productId);
      await loadCart();
      toast.success('Item removed from cart');
      return true;
    } catch (error) {
      console.error('Failed to remove from cart:', error);
      toast.error('Failed to remove item');
      return false;
    }
  };

  const updateQuantity = async (productId: string, newQuantity: number) => {
    if (!user) return false;

    if (newQuantity <= 0) {
      return await removeFromCart(productId);
    }

    try {
      const currentItem = cartItems.find(item => item.productId === productId);
      if (currentItem) {
        const difference = newQuantity - currentItem.quantity;
        if (difference > 0) {
          await MockDatabase.addToCart(user.id, productId, difference);
        } else {
          // For reducing quantity, update cart directly
          const updatedCart = cartItems.map(item => 
            item.productId === productId 
              ? { ...item, quantity: newQuantity }
              : item
          );
          localStorage.setItem(`np_cart_${user.id}`, JSON.stringify(updatedCart));
        }
        await loadCart();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to update quantity:', error);
      toast.error('Failed to update quantity');
      return false;
    }
  };

  const clearCart = async () => {
    if (!user) return false;

    try {
      await MockDatabase.clearCart(user.id);
      await loadCart();
      toast.success('Cart cleared');
      return true;
    } catch (error) {
      console.error('Failed to clear cart:', error);
      toast.error('Failed to clear cart');
      return false;
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

  useEffect(() => {
    loadCart();
  }, [user]);

  return {
    cartItems,
    products,
    isLoading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartItemsWithProducts,
    getTotalPrice,
    getTotalItems,
    refreshCart: loadCart
  };
};