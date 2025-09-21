import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Heart, Search, Leaf, Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { useAuth } from '../contexts/AuthContext';
import { AuthModal } from './auth/AuthModal';
import { UserMenu } from './auth/UserMenu';
import { ProfileModal } from './auth/ProfileModal';
import { CartDrawer } from './CartDrawer';
import exampleImage from 'figma:asset/4af52e66cb1f2ac0619b3df667c634eb44902bb8.png';

export function Header() {
  const { user } = useAuth();
  const location = useLocation();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLoginClick = () => {
    setAuthMode('login');
    setShowAuthModal(true);
  };

  const handleRegisterClick = () => {
    setAuthMode('register');
    setShowAuthModal(true);
  };

  const handleViewProfile = () => {
    setShowProfileModal(true);
  };

  return (
    <>
      <header className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50 w-[90%] max-w-6xl px-4">
        <div className="bg-white/95 backdrop-blur-md rounded-full shadow-lg border border-gray-200/50">
          <div className="flex items-center justify-between px-8 py-4">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img src={exampleImage} alt="Natural Plantation" className="h-10 w-10" />
              <span className="ml-3 text-xl font-semibold text-[var(--text-primary)] hidden sm:block font-secondary">Natural Plantation</span>
            </Link>
            
            {/* Navigation */}
            <nav className="hidden md:flex space-x-8">
              <Link 
                to="/" 
                className={`transition-colors font-medium font-secondary ${
                  location.pathname === '/' 
                    ? 'text-[var(--primary-green)]' 
                    : 'text-[var(--text-secondary)] hover:text-[var(--primary-green)]'
                }`}
              >
                Home
              </Link>
              <Link 
                to="/about" 
                className={`transition-colors font-medium font-secondary ${
                  location.pathname === '/about' 
                    ? 'text-[var(--primary-green)]' 
                    : 'text-[var(--text-secondary)] hover:text-[var(--primary-green)]'
                }`}
              >
                About
              </Link>
              <Link 
                to="/shop" 
                className={`transition-colors font-medium font-secondary ${
                  location.pathname === '/shop' 
                    ? 'text-[var(--primary-green)]' 
                    : 'text-[var(--text-secondary)] hover:text-[var(--primary-green)]'
                }`}
              >
                Shop
              </Link>
              <Link 
                to="/services" 
                className={`transition-colors font-medium font-secondary ${
                  location.pathname === '/services' 
                    ? 'text-[var(--primary-green)]' 
                    : 'text-[var(--text-secondary)] hover:text-[var(--primary-green)]'
                }`}
              >
                Services
              </Link>
              <Link 
                to="/contact" 
                className={`transition-colors font-medium font-secondary ${
                  location.pathname === '/contact' 
                    ? 'text-[var(--primary-green)]' 
                    : 'text-[var(--text-secondary)] hover:text-[var(--primary-green)]'
                }`}
              >
                Contact
              </Link>
            </nav>
            
            {/* Right side - Icons and Auth */}
            <div className="flex items-center space-x-4">
              <Search className="hidden sm:block h-5 w-5 text-[var(--text-secondary)] hover:text-[var(--primary-green)] cursor-pointer transition-colors" />
              <Heart className="hidden sm:block h-5 w-5 text-[var(--text-secondary)] hover:text-[var(--primary-green)] cursor-pointer transition-colors" />
              <CartDrawer>
                <ShoppingCart className="h-5 w-5 text-[var(--text-secondary)] hover:text-[var(--primary-green)] cursor-pointer transition-colors" />
              </CartDrawer>
              
              {user ? (
                <UserMenu onViewProfile={handleViewProfile} />
              ) : (
                <div className="hidden md:flex items-center space-x-2 ml-3">
                  <Button 
                    variant="ghost" 
                    onClick={handleRegisterClick}
                    className="text-[var(--primary-green)] hover:text-[var(--primary-green)]/80 font-secondary px-3"
                  >
                    Sign Up
                  </Button>
                  <Button 
                    onClick={handleLoginClick}
                    className="bg-[var(--primary-green)] hover:bg-[var(--primary-green)]/90 text-white px-6 py-2 rounded-full font-secondary"
                  >
                    Login
                  </Button>
                </div>
              )}
              
              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-20 left-1/2 transform -translate-x-1/2 z-40 w-[90%] max-w-6xl">
          <div className="bg-white/95 backdrop-blur-md rounded-lg shadow-lg border border-gray-200/50 p-6">
            <nav className="space-y-4">
              <Link 
                to="/" 
                onClick={() => setMobileMenuOpen(false)}
                className={`block transition-colors font-medium font-secondary ${
                  location.pathname === '/' 
                    ? 'text-[var(--primary-green)]' 
                    : 'text-[var(--text-secondary)] hover:text-[var(--primary-green)]'
                }`}
              >
                Home
              </Link>
              <Link 
                to="/about"
                onClick={() => setMobileMenuOpen(false)}
                className={`block transition-colors font-medium font-secondary ${
                  location.pathname === '/about' 
                    ? 'text-[var(--primary-green)]' 
                    : 'text-[var(--text-secondary)] hover:text-[var(--primary-green)]'
                }`}
              >
                About
              </Link>
              <Link 
                to="/shop"
                onClick={() => setMobileMenuOpen(false)}
                className={`block transition-colors font-medium font-secondary ${
                  location.pathname === '/shop' 
                    ? 'text-[var(--primary-green)]' 
                    : 'text-[var(--text-secondary)] hover:text-[var(--primary-green)]'
                }`}
              >
                Shop
              </Link>
              <Link 
                to="/services"
                onClick={() => setMobileMenuOpen(false)}
                className={`block transition-colors font-medium font-secondary ${
                  location.pathname === '/services' 
                    ? 'text-[var(--primary-green)]' 
                    : 'text-[var(--text-secondary)] hover:text-[var(--primary-green)]'
                }`}
              >
                Services
              </Link>
              <Link 
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className={`block transition-colors font-medium font-secondary ${
                  location.pathname === '/contact' 
                    ? 'text-[var(--primary-green)]' 
                    : 'text-[var(--text-secondary)] hover:text-[var(--primary-green)]'
                }`}
              >
                Contact
              </Link>
              
              {!user && (
                <div className="pt-4 border-t border-gray-200 space-y-2">
                  <Button 
                    variant="ghost" 
                    onClick={() => {
                      handleRegisterClick();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-[var(--primary-green)] hover:text-[var(--primary-green)]/80 font-secondary"
                  >
                    Sign Up
                  </Button>
                  <Button 
                    onClick={() => {
                      handleLoginClick();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full bg-[var(--primary-green)] hover:bg-[var(--primary-green)]/90 text-white font-secondary"
                  >
                    Login
                  </Button>
                </div>
              )}
              
              <div className="pt-4 border-t border-gray-200 flex justify-center space-x-6">
                <Search className="h-5 w-5 text-[var(--text-secondary)] hover:text-[var(--primary-green)] cursor-pointer transition-colors" />
                <Heart className="h-5 w-5 text-[var(--text-secondary)] hover:text-[var(--primary-green)] cursor-pointer transition-colors" />
              </div>
            </nav>
          </div>
        </div>
      )}

      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)}
        initialMode={authMode}
      />

      <ProfileModal 
        isOpen={showProfileModal} 
        onClose={() => setShowProfileModal(false)}
      />
    </>
  );
}