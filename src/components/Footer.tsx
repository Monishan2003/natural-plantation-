import { Facebook, Twitter, Instagram, Youtube, Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';
import exampleImage from 'figma:asset/4af52e66cb1f2ac0619b3df667c634eb44902bb8.png';

export function Footer() {
  return (
    <footer className="bg-[var(--text-primary)] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center mb-4">
              <img src={exampleImage} alt="Natural Plantation" className="h-10 w-10" />
              <span className="ml-3 text-xl font-semibold font-secondary">Natural Plantation</span>
            </Link>
            <p className="text-gray-400 mb-4 font-secondary">
              Bringing you the finest natural and organic products straight from nature to your doorstep in Sri Lanka.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-gray-400 hover:text-[var(--primary-green)] cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 text-gray-400 hover:text-[var(--primary-green)] cursor-pointer transition-colors" />
              <Instagram className="h-5 w-5 text-gray-400 hover:text-[var(--primary-green)] cursor-pointer transition-colors" />
              <Youtube className="h-5 w-5 text-gray-400 hover:text-[var(--primary-green)] cursor-pointer transition-colors" />
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4 font-secondary">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-400 hover:text-[var(--primary-green)] transition-colors font-secondary">About Us</Link></li>
              <li><Link to="/shop" className="text-gray-400 hover:text-[var(--primary-green)] transition-colors font-secondary">Products</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-[var(--primary-green)] transition-colors font-secondary">Contact</Link></li>
              <li><Link to="/services" className="text-gray-400 hover:text-[var(--primary-green)] transition-colors font-secondary">Services</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-[var(--primary-green)] transition-colors font-secondary">FAQ</Link></li>
            </ul>
          </div>
          
          {/* Categories */}
          <div>
            <h3 className="font-semibold mb-4 font-secondary">Categories</h3>
            <ul className="space-y-2">
              <li><Link to="/shop" className="text-gray-400 hover:text-[var(--primary-green)] transition-colors font-secondary">Aloe Vera Products</Link></li>
              <li><Link to="/shop" className="text-gray-400 hover:text-[var(--primary-green)] transition-colors font-secondary">Herbal Teas</Link></li>
              <li><Link to="/shop" className="text-gray-400 hover:text-[var(--primary-green)] transition-colors font-secondary">Wood Furniture</Link></li>
              <li><Link to="/shop" className="text-gray-400 hover:text-[var(--primary-green)] transition-colors font-secondary">Honey & Supplements</Link></li>
              <li><Link to="/shop" className="text-gray-400 hover:text-[var(--primary-green)] transition-colors font-secondary">Natural Soaps</Link></li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4 font-secondary">Contact Us</h3>
            <div className="space-y-2 text-gray-400 font-secondary">
              <p>📧 info@naturalplantation.lk</p>
              <p>📞 +94 74 268 4140</p>
              <p>📍 Natural Plantation</p>
              <p className="ml-4">99JG+4Q9 Karadipok,</p>
              <p className="ml-4">Kilinochchi, Sri Lanka</p>
              <p>🕒 Mon-Fri: 8AM-6PM</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 font-secondary">
            © 2025 NF Coldings. All rights reserved. | Privacy Policy | Terms of Service
          </p>
        </div>
      </div>
    </footer>
  );
}