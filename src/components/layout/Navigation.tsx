import { Button } from "@/components/ui/button";
import { useNavigationStore, useSiteStore } from "@/stores/useStore";
import { Menu, X, ShoppingCart } from "lucide-react";
import { useState } from "react";
import logoImage from "@/assets/logo.png";

const Navigation = () => {
  const { currentPage, setCurrentPage } = useNavigationStore();
  const { siteData } = useSiteStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigationItems = [
    { id: 'accueil', label: 'Accueil' },
    { id: 'apropos', label: 'À Propos' },
    { id: 'services', label: 'Services' },
    { id: 'contact', label: 'Contact' },
    { id: 'boutique', label: 'Boutique' },
  ];

  const handleNavigation = (pageId: string) => {
    setCurrentPage(pageId);
    setIsMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer"
            onClick={() => handleNavigation('accueil')}
          >
            <img 
              src={logoImage} 
              alt="L'œil du topo" 
              className="w-12 h-12 rounded-full mr-3"
            />
            <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              {siteData.companyName}
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.id)}
                className={`text-base font-medium transition-colors duration-200 ${
                  currentPage === item.id
                    ? 'text-primary border-b-2 border-primary pb-1'
                    : 'text-muted-foreground hover:text-primary'
                }`}
              >
                {item.label}
              </button>
            ))}
            <Button variant="default" size="sm" className="ml-4">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Panier
            </Button>
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
              <button
                key={item.id}
                onClick={() => handleNavigation(item.id)}
                className={`block w-full text-left px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-md ${
                  currentPage === item.id
                    ? 'text-primary bg-primary-light'
                    : 'text-muted-foreground hover:text-primary hover:bg-muted'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="px-4 pt-2">
              <Button variant="default" size="sm" className="w-full">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Panier
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;