// Authentication service
import { User, RegisterData } from './types';
import { MockDatabase } from './database';

export class AuthService {
  // Simulate password hashing (in real app, this would be done on server)
  private static hashPassword(password: string): string {
    // Simple hash simulation - in production use proper hashing
    return btoa(password + 'salt123');
  }

  private static verifyPassword(password: string, hash: string): boolean {
    return this.hashPassword(password) === hash;
  }

  static async login(email: string, password: string): Promise<{ success: boolean; user?: User; error?: string }> {
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));

      const user = await MockDatabase.findUserByEmail(email);
      
      if (!user) {
        return { success: false, error: 'User not found' };
      }

      // In a real app, you'd verify against a hashed password
      // For demo purposes, we'll store a simple hash
      const storedPasswordHash = localStorage.getItem(`password_${user.id}`);
      if (!storedPasswordHash || !this.verifyPassword(password, storedPasswordHash)) {
        return { success: false, error: 'Invalid credentials' };
      }

      // Update last login
      await MockDatabase.updateUserLastLogin(user.id);
      const updatedUser = await MockDatabase.findUserById(user.id);

      // Set current user session
      if (updatedUser) {
        MockDatabase.setCurrentUser(updatedUser);
        return { success: true, user: updatedUser };
      }

      return { success: false, error: 'Login failed' };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Login failed. Please try again.' };
    }
  }

  static async register(userData: RegisterData): Promise<{ success: boolean; user?: User; error?: string }> {
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));

      // Check if user already exists
      const existingUser = await MockDatabase.findUserByEmail(userData.email);
      if (existingUser) {
        return { success: false, error: 'Email already registered' };
      }

      // Validate password strength
      if (userData.password.length < 6) {
        return { success: false, error: 'Password must be at least 6 characters long' };
      }

      // Create new user
      const newUser = await MockDatabase.createUser({
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        phone: userData.phone
      });

      // Store password hash (in production, this would be server-side)
      const passwordHash = this.hashPassword(userData.password);
      localStorage.setItem(`password_${newUser.id}`, passwordHash);

      // Set current user session
      MockDatabase.setCurrentUser(newUser);
      
      return { success: true, user: newUser };
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: 'Registration failed. Please try again.' };
    }
  }

  static logout(): void {
    MockDatabase.clearCurrentUser();
  }

  static getCurrentUser(): User | null {
    return MockDatabase.getCurrentUser();
  }

  static async updateProfile(userId: string, updates: Partial<User>): Promise<{ success: boolean; user?: User; error?: string }> {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const updatedUser = await MockDatabase.updateUser(userId, updates);
      if (updatedUser) {
        MockDatabase.setCurrentUser(updatedUser);
        return { success: true, user: updatedUser };
      }
      
      return { success: false, error: 'Profile update failed' };
    } catch (error) {
      console.error('Profile update error:', error);
      return { success: false, error: 'Profile update failed. Please try again.' };
    }
  }

  static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}