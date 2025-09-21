// Mock database using localStorage
import { User, Product, Order, CartItem } from './types';

// Database keys
const DB_KEYS = {
  USERS: 'np_users',
  PRODUCTS: 'np_products',
  ORDERS: 'np_orders',
  CART: 'np_cart',
  CURRENT_USER: 'np_current_user'
};

// Utility functions for localStorage
export class MockDatabase {
  static getFromStorage<T>(key: string): T[] {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  static saveToStorage<T>(key: string, data: T[]): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error('Failed to save to localStorage:', error);
    }
  }

  // User methods
  static async createUser(userData: Omit<User, 'id' | 'createdAt'>): Promise<User> {
    const users = this.getFromStorage<User>(DB_KEYS.USERS);
    const newUser: User = {
      ...userData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    this.saveToStorage(DB_KEYS.USERS, users);
    return newUser;
  }

  static async findUserByEmail(email: string): Promise<User | null> {
    const users = this.getFromStorage<User>(DB_KEYS.USERS);
    return users.find(user => user.email.toLowerCase() === email.toLowerCase()) || null;
  }

  static async findUserById(id: string): Promise<User | null> {
    const users = this.getFromStorage<User>(DB_KEYS.USERS);
    return users.find(user => user.id === id) || null;
  }

  static async updateUser(id: string, updates: Partial<User>): Promise<User | null> {
    const users = this.getFromStorage<User>(DB_KEYS.USERS);
    const userIndex = users.findIndex(user => user.id === id);
    
    if (userIndex === -1) return null;
    
    users[userIndex] = { ...users[userIndex], ...updates };
    this.saveToStorage(DB_KEYS.USERS, users);
    return users[userIndex];
  }

  static async updateUserLastLogin(id: string): Promise<void> {
    await this.updateUser(id, { lastLogin: new Date().toISOString() });
  }

  // Product methods
  static initializeProducts(): void {
    const existingProducts = this.getFromStorage<Product>(DB_KEYS.PRODUCTS);
    if (existingProducts.length > 0) return;

    const sampleProducts: Product[] = [
      {
        id: '1',
        name: 'Organic Aloe Vera Gel',
        description: 'Pure organic aloe vera gel for skincare and healing',
        price: 2500,
        currency: 'LKR',
        category: 'Aloe Vera',
        image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400',
        inStock: true,
        featured: true
      },
      {
        id: '2',
        name: 'Natural Wood Dining Table',
        description: 'Handcrafted teak wood dining table for 6 people',
        price: 85000,
        currency: 'LKR',
        category: 'Wood Furniture',
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400',
        inStock: true,
        featured: true
      },
      {
        id: '3',
        name: 'Premium Ceylon Tea',
        description: 'High-quality organic Ceylon black tea leaves',
        price: 1200,
        currency: 'LKR',
        category: 'Tea',
        image: 'https://images.unsplash.com/photo-1594631661960-0ad849c3d63b?w=400',
        inStock: true,
        featured: false
      },
      {
        id: '4',
        name: 'Aloe Vera Face Cream',
        description: 'Moisturizing face cream with natural aloe vera extract',
        price: 1800,
        currency: 'LKR',
        category: 'Aloe Vera',
        image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400',
        inStock: true,
        featured: true
      },
      {
        id: '5',
        name: 'Wooden Coffee Table',
        description: 'Rustic wooden coffee table made from sustainable wood',
        price: 45000,
        currency: 'LKR',
        category: 'Wood Furniture',
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400',
        inStock: true,
        featured: false
      },

      {
        id: '7',
        name: 'Green Tea with Mint',
        description: 'Refreshing green tea blend with natural mint leaves',
        price: 1500,
        currency: 'LKR',
        category: 'Tea',
        image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400',
        inStock: true,
        featured: false
      },
      {
        id: '8',
        name: 'Natural Soap Set',
        description: 'Set of 3 handmade soaps with coconut oil and herbs',
        price: 950,
        currency: 'LKR',
        category: 'Soap',
        image: 'https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=400',
        inStock: true,
        featured: false
      }
    ];

    this.saveToStorage(DB_KEYS.PRODUCTS, sampleProducts);
  }

  static async getAllProducts(): Promise<Product[]> {
    return this.getFromStorage<Product>(DB_KEYS.PRODUCTS);
  }

  static async getFeaturedProducts(): Promise<Product[]> {
    const products = this.getFromStorage<Product>(DB_KEYS.PRODUCTS);
    return products.filter(product => product.featured);
  }

  static async getProductsByCategory(category: string): Promise<Product[]> {
    const products = this.getFromStorage<Product>(DB_KEYS.PRODUCTS);
    return products.filter(product => product.category.toLowerCase() === category.toLowerCase());
  }

  // Cart methods
  static async getCart(userId: string): Promise<CartItem[]> {
    const cartKey = `${DB_KEYS.CART}_${userId}`;
    return this.getFromStorage<CartItem>(cartKey);
  }

  static async addToCart(userId: string, productId: string, quantity: number = 1): Promise<void> {
    const cartKey = `${DB_KEYS.CART}_${userId}`;
    const cart = this.getFromStorage<CartItem>(cartKey);
    
    const existingItem = cart.find(item => item.productId === productId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({
        productId,
        quantity,
        addedAt: new Date().toISOString()
      });
    }
    
    this.saveToStorage(cartKey, cart);
  }

  static async removeFromCart(userId: string, productId: string): Promise<void> {
    const cartKey = `${DB_KEYS.CART}_${userId}`;
    const cart = this.getFromStorage<CartItem>(cartKey);
    const updatedCart = cart.filter(item => item.productId !== productId);
    this.saveToStorage(cartKey, updatedCart);
  }

  static async clearCart(userId: string): Promise<void> {
    const cartKey = `${DB_KEYS.CART}_${userId}`;
    this.saveToStorage(cartKey, []);
  }

  // Session management
  static setCurrentUser(user: User): void {
    try {
      localStorage.setItem(DB_KEYS.CURRENT_USER, JSON.stringify(user));
    } catch (error) {
      console.error('Failed to set current user:', error);
    }
  }

  static getCurrentUser(): User | null {
    try {
      const userData = localStorage.getItem(DB_KEYS.CURRENT_USER);
      return userData ? JSON.parse(userData) : null;
    } catch {
      return null;
    }
  }

  static clearCurrentUser(): void {
    try {
      localStorage.removeItem(DB_KEYS.CURRENT_USER);
    } catch (error) {
      console.error('Failed to clear current user:', error);
    }
  }
}

// Initialize the database with sample products
MockDatabase.initializeProducts();