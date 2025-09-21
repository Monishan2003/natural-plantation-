import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

export function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="pt-8 pb-16">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-2xl mx-auto">
          {/* 404 Illustration */}
          <div className="mb-8">
            <h1 className="text-8xl md:text-9xl font-bold text-[var(--secondary-green)] mb-4">
              404
            </h1>
            <div className="w-32 h-1 bg-[var(--primary-green)] mx-auto mb-8"></div>
          </div>

          {/* Content */}
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">
            Oops! Page Not Found
          </h2>
          <p className="text-lg text-[var(--text-secondary)] font-secondary mb-8 max-w-md mx-auto">
            The page you're looking for seems to have wandered off into the natural world. 
            Let's get you back on track!
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => navigate(-1)}
              variant="outline"
              className="border-[var(--primary-green)] text-[var(--primary-green)] hover:bg-[var(--primary-green)] hover:text-white"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Button>
            <Button 
              onClick={() => navigate('/')}
              className="bg-[var(--primary-green)] hover:bg-[var(--primary-green)]/90 text-white"
            >
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </div>

          {/* Quick Links */}
          <div className="mt-12 p-6 bg-[var(--secondary-green)] rounded-lg">
            <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
              Looking for something specific?
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/shop')}
                className="text-[var(--text-secondary)] hover:text-[var(--primary-green)]"
              >
                Shop
              </Button>
              <Button 
                variant="ghost" 
                onClick={() => navigate('/about')}
                className="text-[var(--text-secondary)] hover:text-[var(--primary-green)]"
              >
                About Us
              </Button>
              <Button 
                variant="ghost" 
                onClick={() => navigate('/services')}
                className="text-[var(--text-secondary)] hover:text-[var(--primary-green)]"
              >
                Services
              </Button>
              <Button 
                variant="ghost" 
                onClick={() => navigate('/contact')}
                className="text-[var(--text-secondary)] hover:text-[var(--primary-green)]"
              >
                Contact
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}