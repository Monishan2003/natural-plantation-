// Types for our application
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  address?: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  createdAt: string;
  lastLogin?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  category: string;
  image: string;
  inStock: boolean;
  featured?: boolean;
}

export interface CartItem {
  productId: string;
  quantity: number;
  addedAt: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  shippingAddress: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (userData: RegisterData) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<{ success: boolean; error?: string }>;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
}