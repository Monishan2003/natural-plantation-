import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export function Breadcrumb() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(Boolean);

  // Don't show breadcrumb on home page
  if (location.pathname === '/') return null;

  const breadcrumbItems = [
    { name: 'Home', path: '/' },
    ...pathnames.map((name, index) => {
      const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
      return {
        name: name.charAt(0).toUpperCase() + name.slice(1),
        path: routeTo
      };
    })
  ];

  return (
    <nav className="container mx-auto px-4 pt-32 pb-4">
      <ol className="flex items-center space-x-2 text-sm text-[var(--text-secondary)] font-secondary">
        {breadcrumbItems.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && <ChevronRight className="h-4 w-4 mx-2" />}
            {index === 0 ? (
              <Link 
                to={item.path}
                className="flex items-center hover:text-[var(--primary-green)] transition-colors"
              >
                <Home className="h-4 w-4 mr-1" />
                {item.name}
              </Link>
            ) : index === breadcrumbItems.length - 1 ? (
              <span className="text-[var(--text-primary)] font-medium">{item.name}</span>
            ) : (
              <Link 
                to={item.path}
                className="hover:text-[var(--primary-green)] transition-colors"
              >
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}