import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useShopStore } from "@/stores/useStore";
import { Search, Filter, ShoppingCart, Star, Package, Settings } from "lucide-react";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import AdminPanel from "@/components/admin/AdminPanel";
import bannerBoutique from "@/assets/banner-boutique.jpg";

// Simulation d'API pour les produits
const fetchProducts = async () => {
  // En attendant l'API réelle
  return [
    {
      id: "1",
      name: "Théodolite électronique DT-209",
      price: 2899,
      description: "Théodolite électronique de précision pour relevés topographiques professionnels",
      image: "/placeholder.svg",
      category: "Instruments",
      inStock: true,
      rating: 4.8
    },
    {
      id: "2", 
      name: "GPS RTK Leica GS18",
      price: 12500,
      description: "Récepteur GNSS RTK haute précision pour levés topographiques",
      image: "/placeholder.svg",
      category: "GPS",
      inStock: true,
      rating: 4.9
    },
    {
      id: "3",
      name: "Niveau automatique NA320",
      price: 890,
      description: "Niveau automatique compensé pour mesures altimétriques",
      image: "/placeholder.svg", 
      category: "Instruments",
      inStock: false,
      rating: 4.6
    },
    {
      id: "4",
      name: "Logiciel AutoCAD Civil 3D",
      price: 1699,
      description: "Suite logicielle pour conception et modélisation en génie civil",
      image: "/placeholder.svg",
      category: "Logiciels",
      inStock: true,
      rating: 4.7
    },
    {
      id: "5",
      name: "Scanner laser 3D RTC360",
      price: 45000,
      description: "Scanner laser 3D ultra-rapide pour relevés architecturaux",
      image: "/placeholder.svg",
      category: "Scanning",
      inStock: true,
      rating: 5.0
    },
    {
      id: "6",
      name: "Drone DJI Phantom RTK",
      price: 8500,
      description: "Drone de cartographie avec géolocalisation RTK centimétrique",
      image: "/placeholder.svg",
      category: "Drones",
      inStock: true,
      rating: 4.8
    }
  ];
};

const Boutique = () => {
  const { products, cart, setProducts, addToCart } = useShopStore();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [isAdminMode, setIsAdminMode] = useState(false);

  const handleAddToCart = (product: any) => {
    addToCart(product);
    toast({
      title: "✅ Produit ajouté !",
      description: `${product.name} a été ajouté à votre panier avec succès.`,
      duration: 3000,
    });
  };

  const { data: apiProducts, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts
  });

  useEffect(() => {
    if (apiProducts) {
      setProducts(apiProducts);
    }
  }, [apiProducts, setProducts]);

  const categories = ["all", "Instruments", "GPS", "Logiciels", "Scanning", "Drones"];

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
            <Button
              variant="outline"
              onClick={() => setIsAdminMode(!isAdminMode)}
              className="flex items-center"
            >
              <Settings className="w-4 h-4 mr-2" />
              {isAdminMode ? "Mode Client" : "Administration"}
            </Button>
            <Button className="flex items-center">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Panier ({cart.length})
            </Button>
          </div>
        </div>

        {/* Admin Panel */}
        {isAdminMode && <AdminPanel />}

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
            <Card key={product.id} className="border-0 shadow-md hover:shadow-lg transition-all duration-300 group cursor-pointer"
                  onClick={() => window.location.href = `/produit/${product.id}`}>
              <CardContent className="p-0">
                <div className="aspect-square bg-muted rounded-t-lg overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                <div className="p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <Badge variant="secondary">{product.category}</Badge>
                    {!product.inStock && (
                      <Badge variant="destructive">Rupture</Badge>
                    )}
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-foreground text-lg mb-2 group-hover:text-primary transition-colors cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.location.href = `/produit/${product.id}`;
                        }}>
                      {product.name}
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-2">
                      {product.description}
                    </p>
                  </div>

                  {product.rating && (
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${
                              i < Math.floor(product.rating) 
                                ? "text-accent fill-current" 
                                : "text-muted-foreground"
                            }`} 
                          />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {product.rating}/5
                      </span>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-2 border-t">
                    <span className="text-2xl font-bold text-primary">
                      {product.price.toLocaleString('fr-FR')} €
                    </span>
                    
                    <div className="flex items-center justify-between gap-2">
                      <Button 
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.location.href = `/produit/${product.id}`;
                        }}
                      >
                        Voir détails
                      </Button>
                      <Button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(product);
                        }}
                        disabled={!product.inStock}
                        size="sm"
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        {product.inStock ? "Ajouter" : "Indisponible"}
                      </Button>
                    </div>
                  </div>

                  {isAdminMode && (
                    <div className="flex space-x-2 pt-2 border-t border-accent/20">
                      <Button variant="outline" size="sm" className="flex-1">
                        Modifier
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        Stock
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
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
    </div>
  );
};

export default Boutique;