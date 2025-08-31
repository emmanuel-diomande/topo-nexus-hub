import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useShopStore, useAuthStore } from "@/stores/useStore";
import { Search, ShoppingCart, Package, Settings, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { api, Product, Category } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import AdminPanel from "@/components/admin/AdminPanel";
import { AuthDialog } from "@/components/admin/AuthDialog";
import { ProductEditDialog } from "@/components/admin/ProductEditDialog";
import { StockDialog } from "@/components/admin/StockDialog";
import { CardProduit } from "@/components/CardProduit";
import bannerBoutique from "@/assets/banner-boutique.jpg";


const Boutique = () => {
  const { products, cart, setProducts, addToCart } = useShopStore();
  const { isAuthenticated, logout } = useAuthStore();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showStockDialog, setShowStockDialog] = useState(false);

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    toast({
      title: "✅ Produit ajouté !",
      description: `${product.name} a été ajouté à votre panier avec succès.`,
      duration: 3000,
    });
  };

  const { data: apiProducts, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: api.getProducts
  });

  const { data: apiCategories } = useQuery({
    queryKey: ['categories'],
    queryFn: api.getCategories
  });

  useEffect(() => {
    if (apiProducts) {
      setProducts(apiProducts);
    }
  }, [apiProducts, setProducts]);

  const categories = ["all", ...(apiCategories?.map(cat => cat.name) || [])];

  const filteredProducts = products
    .filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === "all" || product.category === selectedCategory)
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "rating":
          return (b.rating || 0) - (a.rating || 0);
        default:
          return a.name.localeCompare(b.name);
      }
    });

  if (isLoading) {
    return (
      <div className="min-h-screen py-16 flex items-center justify-center">
        <div className="text-center">
          <Package className="w-12 h-12 text-primary mx-auto mb-4 animate-pulse" />
          <p className="text-lg text-muted-foreground">Chargement des produits...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Banner */}
      <section className="relative h-80 flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${bannerBoutique})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-secondary/80"></div>
        </div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Boutique Technique
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Équipements professionnels et logiciels spécialisés pour vos projets de topographie
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12">
          <div className="flex items-center space-x-4 mt-6 lg:mt-0">
            {!isAuthenticated ? (
              <Button
                variant="outline"
                onClick={() => setShowAuthDialog(true)}
                className="flex items-center"
              >
                <Settings className="w-4 h-4 mr-2" />
                Administration
              </Button>
            ) : (
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setIsAdminMode(!isAdminMode)}
                  className="flex items-center"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  {isAdminMode ? "Mode Client" : "Administration"}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    logout();
                    setIsAdminMode(false);
                    toast({
                      title: "Déconnexion",
                      description: "Vous avez été déconnecté de l'administration"
                    });
                  }}
                  className="flex items-center"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Déconnexion
                </Button>
              </div>
            )}
            <Button className="flex items-center">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Panier ({cart.length})
            </Button>
          </div>
        </div>

        {/* Admin Panel */}
        {isAdminMode && isAuthenticated && <AdminPanel />}

        {/* Search and Filters */}
        <div className="bg-gradient-card p-6 rounded-lg mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Rechercher un produit..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Catégorie" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category === "all" ? "Toutes les catégories" : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Trier par" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Nom A-Z</SelectItem>
                <SelectItem value="price-asc">Prix croissant</SelectItem>
                <SelectItem value="price-desc">Prix décroissant</SelectItem>
                <SelectItem value="rating">Meilleures notes</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <CardProduit
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
              isAdminMode={isAdminMode}
              isAuthenticated={isAuthenticated}
              onEdit={(product) => {
                setSelectedProduct(product);
                setShowEditDialog(true);
              }}
              onStock={(product) => {
                setSelectedProduct(product);
                setShowStockDialog(true);
              }}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">Aucun produit trouvé</h3>
            <p className="text-muted-foreground">
              Essayez de modifier vos critères de recherche ou de filtrage.
            </p>
          </div>
        )}

        {/* Category Stats */}
        <div className="mt-16 bg-gradient-card p-8 rounded-lg">
          <h3 className="text-2xl font-bold text-foreground mb-6 text-center">
            Catalogue par catégories
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {categories.slice(1).map(category => {
              const count = products.filter(p => p.category === category).length;
              return (
                <div key={category} className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-primary mb-1">{count}</div>
                  <div className="text-sm text-muted-foreground">{category}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      {/* Dialogs */}
      <AuthDialog 
        open={showAuthDialog} 
        onOpenChange={setShowAuthDialog} 
      />
      <ProductEditDialog 
        product={selectedProduct}
        open={showEditDialog} 
        onOpenChange={setShowEditDialog} 
      />
      <StockDialog 
        product={selectedProduct}
        open={showStockDialog} 
        onOpenChange={setShowStockDialog} 
      />
    </div>
  );
};

export default Boutique;