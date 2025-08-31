import { Button } from "@/components/ui/button";
import { useSiteStore } from "@/stores/useStore";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logoImage from "@/assets/logo.jpeg";
import Cart from "@/components/layout/Cart";

const Navigation = () => {
  const location = useLocation();
  const { siteData } = useSiteStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigationItems = [
    { id: 'accueil', label: 'Accueil', path: '/accueil' },
    { id: 'apropos', label: 'À Propos', path: '/a-propos' },
    { id: 'services', label: 'Services', path: '/services' },
    { id: 'contact', label: 'Contact', path: '/contact' },
    { id: 'boutique', label: 'Boutique', path: '/boutique' },
  ];

  const isActiveRoute = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link 
            to="/accueil"
            className="flex items-center"
          >
            <img 
              src={logoImage} 
              alt="L'œil du topo" 
              className="w-12 h-12 rounded-full mr-3"
            />
            <span className="md:text-2xl text-lg font-bold bg-gradient-primary bg-clip-text text-transparent">
              {siteData.companyName}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                className={`text-base font-medium transition-colors duration-200 ${
                  isActiveRoute(item.path)
                    ? 'text-primary border-b-2 border-primary pb-1'
                    : 'text-muted-foreground hover:text-primary'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Cart />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t py-4 space-y-2">
            {navigationItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={`block w-full text-left px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-md ${
                  isActiveRoute(item.path)
                    ? 'text-primary bg-primary-light'
                    : 'text-muted-foreground hover:text-primary hover:bg-muted'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="px-4 pt-2">
              <Cart />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;